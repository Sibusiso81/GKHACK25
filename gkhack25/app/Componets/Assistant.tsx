/* // pages/index.tsx
import React, { useEffect, useRef, useState } from 'react';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:9083';

export default function Assistant() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [currentFrameB64, setCurrentFrameB64] = useState<string | null>(null);
  const pcmDataRef = useRef<Int16Array[]>([]);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const audioInputContextRef = useRef<AudioContext | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const [chatLog, setChatLog] = useState<string[]>([]);
  const captureIntervalRef = useRef<number | null>(null);
  const recordIntervalRef = useRef<number | null>(null);

  function addLog(msg: string) {
    setChatLog(prev => [...prev, msg]);
    console.log(msg);
  }

  useEffect(() => {
    // Start screen sharing and audio worklet initialization on client mount
    startScreenShare().catch(e => addLog('screen share error: ' + e));
    initializeAudioWorklet().catch(e => addLog('worklet init error: ' + e));

    // connect ws
    const socket = new WebSocket(WS_URL);
    socket.onopen = () => {
      addLog('WebSocket opened');
      const setup_msg = {
        setup: {
          generation_config: { response_modalities: ['AUDIO'] }
        }
      };
      socket.send(JSON.stringify(setup_msg));
    };
    socket.onmessage = (evt) => {
      try {
        const data = JSON.parse(evt.data);
        if (data.text) addLog('GEMINI: ' + data.text);
        if (data.audio) {
          // data.audio is base64 PCM bytes
          ingestAudioChunkToPlay(data.audio);
        }
      } catch (e) {
        console.error('ws message parse', e);
      }
    };
    socket.onclose = () => addLog('WebSocket closed');
    socket.onerror = (e) => addLog('WebSocket error');

    setWs(socket);

    return () => {
      socket.close();
      // cleanup
      clearIntervals();
      stopAudioInput();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function startScreenShare() {
    try {
      const s = await (navigator.mediaDevices as any).getDisplayMedia({
        video: { width: { max: 640 }, height: { max: 480 } }
      });
      if (!videoRef.current) return;
      videoRef.current.srcObject = s;
      await new Promise<void>(resolve => {
        videoRef.current!.onloadedmetadata = () => resolve();
      });
      // capture first frame immediately and then every 3s
      captureImage();
      captureIntervalRef.current = window.setInterval(captureImage, 3000);
      addLog('screen share started');
    } catch (err) {
      addLog('Error accessing the screen: ' + String(err));
    }
  }

  function captureImage() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    if (video.videoWidth === 0 || video.videoHeight === 0) return;
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/jpeg').split(',')[1].trim();
    setCurrentFrameB64(imageData);
  }

  async function initializeAudioWorklet() {
    if (audioInputContextRef.current) return;
    const ac = new (window.AudioContext || (window as any).webkitAudioContext)({
      sampleRate: 24000
    });
    audioInputContextRef.current = ac;
    // load processor from public folder
    await ac.audioWorklet.addModule('/pcm-processor.js');
    const node = new AudioWorkletNode(ac, 'pcm-processor');
    node.connect(ac.destination);
    workletNodeRef.current = node;
    addLog('AudioWorklet initialized');
  }

  function base64ToArrayBuffer(base64: string) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  function convertPCM16LEToFloat32(pcmBuffer: ArrayBuffer) {
    const input = new Int16Array(pcmBuffer);
    const out = new Float32Array(input.length);
    for (let i = 0; i < input.length; i++) {
      out[i] = input[i] / 32768;
    }
    return out;
  }

  async function ingestAudioChunkToPlay(base64AudioChunk: string) {
    try {
      const ac = audioInputContextRef.current;
      if (!ac) return;
      if (ac.state === 'suspended') await ac.resume();
      const ab = base64ToArrayBuffer(base64AudioChunk);
      const float32 = convertPCM16LEToFloat32(ab);
      const worklet = workletNodeRef.current;
      if (!worklet) return;
      // send Float32Array buffer to worklet
      worklet.port.postMessage(float32);
    } catch (err) {
      console.error('Error processing audio chunk:', err);
    }
  }

  // --- Recording / sending audio from mic to server in 3s chunks ---
  async function startAudioInput() {
    // if already active, do nothing
    if (processorRef.current) return;
    const audioContext = new AudioContext({ sampleRate: 16000 });
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { channelCount: 1, sampleRate: 16000 }
    });
    const source = audioContext.createMediaStreamSource(stream);
    const processor = audioContext.createScriptProcessor(4096, 1, 1);
    processor.onaudioprocess = (e) => {
      const inputData = e.inputBuffer.getChannelData(0);
      // convert to 16-bit PCM
      const pcm16 = new Int16Array(inputData.length);
      for (let i = 0; i < inputData.length; i++) {
        const v = Math.max(-1, Math.min(1, inputData[i]));
        pcm16[i] = v < 0 ? v * 0x8000 : v * 0x7fff;
      }
      pcmDataRef.current.push(pcm16);
    };

    source.connect(processor);
    processor.connect(audioContext.destination);

    processorRef.current = processor;

    // every 3s, merge pcmData and send base64 PCM to WS
    recordIntervalRef.current = window.setInterval(() => {
      try {
        // merge the arrays
        if (pcmDataRef.current.length === 0) return;
        let totalLen = 0;
        pcmDataRef.current.forEach(arr => totalLen += arr.length);
        const merged = new Int16Array(totalLen);
        let offset = 0;
        pcmDataRef.current.forEach(arr => {
          merged.set(arr, offset);
          offset += arr.length;
        });
        // create ArrayBuffer with little-endian 16-bit
        const buffer = new ArrayBuffer(merged.length * 2);
        const view = new DataView(buffer);
        for (let i = 0; i < merged.length; i++) {
          view.setInt16(i * 2, merged[i], true);
        }
        const b64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
        // send both audio chunk and the latest frame image
        sendVoiceMessage(b64);
        pcmDataRef.current = [];
      } catch (err) {
        console.error('record chunk error', err);
      }
    }, 3000);

    addLog('Audio input started');
  }

  function stopAudioInput() {
    if (processorRef.current) {
      try {
        processorRef.current.disconnect();
      } catch (e) {}
      processorRef.current = null;
    }
    if (recordIntervalRef.current) {
      clearInterval(recordIntervalRef.current);
      recordIntervalRef.current = null;
    }
    addLog('Audio input stopped');
  }

  function clearIntervals() {
    if (captureIntervalRef.current) {
      clearInterval(captureIntervalRef.current);
      captureIntervalRef.current = null;
    }
    if (recordIntervalRef.current) {
      clearInterval(recordIntervalRef.current);
      recordIntervalRef.current = null;
    }
  }

  function sendVoiceMessage(b64PCM: string) {
    if (!ws) {
      addLog('websocket not initialized');
      return;
    }
    const payload = {
      realtime_input: {
        media_chunks: [
          { mime_type: 'audio/pcm', data: b64PCM },
          { mime_type: 'image/jpeg', data: currentFrameB64 }
        ]
      }
    };
    ws.send(JSON.stringify(payload));
    addLog('Sent media chunk (audio + image)');
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Gemini Live Demo (Next.js)</h1>

      <div style={{ marginBottom: 12 }}>
        <button onClick={() => startAudioInput()}>Start Mic</button>
        <button onClick={() => stopAudioInput()}>Stop Mic</button>
      </div>

      <video
        ref={videoRef}
        autoPlay
        style={{ width: 640, height: 480, borderRadius: 12, border: '1px solid #ccc' }}
      />
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div style={{ marginTop: 20 }}>
        <h3>Chat Log</h3>
        <div style={{ maxHeight: 240, overflow: 'auto', border: '1px solid #ddd', padding: 8 }}>
          {chatLog.map((c, i) => <div key={i}><small>{c}</small></div>)}
        </div>
      </div>
    </div>
  );
}
 */