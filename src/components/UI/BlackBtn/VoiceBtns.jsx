import React, { useMemo, useRef, useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import cl from "./BackBtn.module.scss";
const VoiceBtns = ({ text }) => {
  const langArr = useMemo(() => ["en", "ru", "pl", "ua"], []);
  const [lang, setLang] = useState("en");
  const btnRef = useRef(null);

  const onHandleClick = (e) => {
    e.stopPropagation();
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    // const voices = synth.getVoices();
    // voices.forEach((voice) => {
    //   console.log(`Available voice: ${voice.name}, Language: ${voice.lang}`);
    // });
    utterance.lang = lang;
    synth.speak(utterance);
  };
  return (
    <div ref={btnRef} className={cl["voice-mainBox"]}>
      <div className={cl["voice-wrap"]}>
        <div className={cl["langs"]}>
          {langArr.map((el, i) => (
            <p
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setLang(el);
              }}
              className={cl["langEl" + (lang === el)]}>
              {el}
            </p>
          ))}
        </div>

        <button onClick={onHandleClick} title="Voice" className={cl.btnVoice}>
          <FaMicrophone />
        </button>
      </div>
    </div>
  );
};

export default VoiceBtns;
