'use client'
import React, { useState } from "react";
import { langData } from "./LangData";
import LandingPage from "./LandingPage";
import { WordRotate } from "@/components/magicui/word-rotate";

function SelectLang() {
  const [langSlected, setLangSelected] = useState(String);
  const [selected, setSelected] = useState(false);
  const [index, setIndex] = useState<number>(0);

  function handleSelectedLanguage(i: number) {
    setLangSelected(langData[i].language);
    setSelected(true);
    setIndex(langData.indexOf(langData[i]));
    console.log(langSlected)
  }

  function setUserLanguage(lang: string): void {
    setLangSelected(lang);
  }

  return (
    <>
      {!selected ? (
        <div className="w-screen h-screen flex flex-col font-poppins bg-gradient-to-bl bg-white items-center justify-center p-3">
          {" "}
          <div className="mx-auto my-auto md:w-1/2 max-w-screen-md space-y-8 place-self-center justify-self-center ">
            <div className="flex flex-col justify-between">
              <h1 className="place-self-start text-lg font-medium">
                <WordRotate
                  duration={5500}
                  words={[
                    "Please select a preferred Language", // English
                    "Kies asseblief 'n voorkeurtaal", // Afrikaans
                    "Nceda Khetha uLimi olukhethako", // IsiNdebele
                    "Nceda Khetha uLwimi olukhethwayo", // IsiXhosa
                    "Sicela Ukhethe Ulimi Olukhethwayo", // IsiZulu
                    "Hleka Kgetha Leleme Leo o le Nyakago", // Sepedi
                    "Ka kopo Khetha Puo eo o e Khethang", // Sesotho
                    "Tsweetswee Tlhopha Puo e o e Ratang", // Setswana
                    "Sicela Ukhethe Luphatsa Lolukhetsako", // Siswati
                    "Ndapfidzo Khethani Luambo Lu laho", // Tshivenḓa
                    "Ndzinga Hlawula Ririmi leri u ri Rhandzaka", // Xitsonga
                  ]}
                />
              </h1>
              <span className="w-32 h-1  border-b-4 border-lime-400 p-1 "></span>
            </div>
            <div className=" grid grid-cols-3 gap-3 text-md">
              {Array(10)
                .fill(null)
                .map((_, i) => (
                  <button
                    className="p-2 bg-gray-200 text-md rounded-md hover:bg-gray-300/85"
                    onClick={() => handleSelectedLanguage(i)}
                    key={i}
                  >
                    {langData[i].language}
                  </button>
                ))}
            </div>
          </div>
          <div className="flex flex-col  ">
            <div>
              <h2></h2>
            </div>
          </div>
        </div>
      ) : (
        <>
          <LandingPage
            index={index}
            onLanguageChange={(lang) => setUserLanguage(lang)}
          />{" "}
        </>
      )}
    </>
  );
}

export default SelectLang;
