// public/pcm-processor.js
class PCMProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.buffer = new Float32Array();

    // Handle incoming Float32Array messages from main thread
    this.port.onmessage = (e) => {
      const newData = e.data;
      // If incoming is ArrayBuffer or Float32Array, normalize to Float32Array
      let incoming;
      if (newData instanceof ArrayBuffer) {
        incoming = new Float32Array(newData);
      } else if (ArrayBuffer.isView(newData)) {
        incoming = new Float32Array(newData.buffer);
      } else {
        // assume already Float32Array
        incoming = new Float32Array(newData);
      }

      const newBuffer = new Float32Array(this.buffer.length + incoming.length);
      newBuffer.set(this.buffer, 0);
      newBuffer.set(incoming, this.buffer.length);
      this.buffer = newBuffer;
    };
  }

  process(inputs, outputs, parameters) {
    const output = outputs[0];
    if (!output || !output[0]) return true;
    const channelData = output[0];

    if (this.buffer.length >= channelData.length) {
      channelData.set(this.buffer.slice(0, channelData.length));
      this.buffer = this.buffer.slice(channelData.length);
    } else {
      // If there's not enough buffered audio, fill whatever is available and zero the rest
      if (this.buffer.length > 0) {
        channelData.set(this.buffer, 0);
        for (let i = this.buffer.length; i < channelData.length; i++) {
          channelData[i] = 0;
        }
        this.buffer = new Float32Array();
      } else {
        // no buffer — write silence
        for (let i = 0; i < channelData.length; i++) channelData[i] = 0;
      }
    }

    return true;
  }
}

registerProcessor('pcm-processor', PCMProcessor);
