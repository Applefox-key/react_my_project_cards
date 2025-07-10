import React, { useMemo, useRef, useState } from "react";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import cl from "./VoiceBtns.module.scss";
// import cl from "./BackBtn.module.scss";

const VoiceBtns = ({ text, className }) => {
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
  const oneEl = (locale) => {
    const [language, region = ""] = locale.split("-");
    return (
      <>
        <span className={cl.lan}>{language}</span>{" "}
        <span className={cl.loc}>{region}</span>
      </>
    );
  };
  const onHandleClick = (e) => {
    e.stopPropagation();
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = lang;
    synth.speak(utterance);
  };

  return (
    <div ref={btnRef} className={[cl["voice-main"], className].join(" ")}>
      <button onClick={onHandleClick} title="Voice" className={cl.btnVoice}>
        <HiOutlineSpeakerWave />
      </button>
      <div className={cl.langs}>
        {langArr.map((el, i) => (
          <p
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setLang(el);
            }}
            className={cl["langEl" + (lang === el)]}>
            {oneEl(el)}
          </p>
        ))}
      </div>
    </div>
  );
};

export default VoiceBtns;
