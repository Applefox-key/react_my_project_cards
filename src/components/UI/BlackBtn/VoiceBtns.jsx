import React, { useMemo, useRef, useState } from "react";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import cl from "./BackBtn.module.scss";

const VoiceBtns = ({ text }) => {
  const [lang, setLang] = useState("en-US");
  const langArr = useMemo(() => {
    const synth = window.speechSynthesis;
    const arrV = ["en-US", "ru-RU"];
    const voices = synth.getVoices();
    voices.forEach((voice) => {
      if (!arrV.includes(voice.lang)) arrV.push(voice.lang);
    });

    return arrV;
  }, []);
  const btnRef = useRef(null);

  const onHandleClick = (e) => {
    e.stopPropagation();
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = lang;
    synth.speak(utterance);
  };
  return (
    <div ref={btnRef} className={cl["voice-mainBox"]}>
      <button onClick={onHandleClick} title="Voice" className={cl.btnVoice}>
        <HiOutlineSpeakerWave />
      </button>
      <div className={cl["langs"]}>
        {langArr.map((el, i) => (
          <div
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setLang(el);
            }}
            className={cl["langEl" + (lang === el)]}>
            {el}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoiceBtns;
