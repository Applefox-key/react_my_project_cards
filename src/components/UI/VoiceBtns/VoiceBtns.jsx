import React, { useEffect, useRef, useState } from "react";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import cl from "./VoiceBtns.module.scss";
// import cl from "./BackBtn.module.scss";

const VoiceBtns = ({ text, className }) => {
  const [lang, setLang] = useState("en-US");
  const [langArr, setLangArr] = useState({ langs: [], voices: {} });
  // const langArr = useMemo(() => {
  //   const synth = window.speechSynthesis;
  //   const arrV = ["en-US", "ru-RU"];
  //   const voices = synth.getVoices();
  //   // console.log(voices);
  //   const voicesByLang = voices.reduce((acc, voice) => {
  //     const { lang } = voice;
  //     if (!acc[lang]) {
  //       acc[lang] = [];
  //     }
  //     acc[lang].push(voice);
  //     return acc;
  //   }, {});

  //   return { langs: Object.keys(voicesByLang), voices: voicesByLang };
  // }, []);
  const btnRef = useRef(null);
  useEffect(() => {
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const voices = synth.getVoices();
      if (!voices.length) return;

      const voicesByLang = voices.reduce((acc, voice) => {
        const { lang } = voice;
        if (!acc[lang]) acc[lang] = [];
        acc[lang].push(voice);
        return acc;
      }, {});

      setLangArr({
        langs: Object.keys(voicesByLang),
        voices: voicesByLang,
      });
    };

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }

    loadVoices();
  }, []);

  const oneEl = (locale) => {
    const [language, region = ""] = locale.split(/[-_]/);
    return (
      <>
        <span className={cl.lan}>{language}</span>
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
        {langArr.langs.map((el, i) => (
          <div
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setLang(el);
            }}
            className={cl["langEl" + (lang === el)]}>
            {oneEl(el)}
            {/* {langArr.voices[el].length > 1 && (
              <div className={cl.voices}>
                {langArr.voices[el].map((v, j) => (
                  <span>voice {j}</span>
                ))}
              </div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoiceBtns;
