import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

import { useOutsideClick } from "../../hooks/useOutSideClick";
import { stopV, startV } from "../../utils/voice";

const VoiceBtns = ({ textRef, disable }) => {
  const [lang, setLang] = useState(0);
  const langArr = useMemo(() => ["en", "ru", "pl"], []);
  const btnRef = useRef(null);
  const stopBtn = useRef(null);
  const startBtn = useRef(null);
  const onClick = () => {
    if (stopBtn.current.style.display === "none") {
      startV(textRef, lang ? langArr[lang] : "");
      stopBtn.current.style.display = "inline";
      startBtn.current.style.display = "none";
    } else if (startBtn.current.style.display === "none") {
      stopV(textRef, onchange);
      startBtn.current.style.display = "inline";
      stopBtn.current.style.display = "none";
    }
  };

  useEffect(() => {
    stopBtn.current.style.display = "none";
  }, []);

  useOutsideClick(btnRef, () => {
    if (startBtn.current.style.display === "none") {
      stopV(textRef, onchange);
      startBtn.current.style.display = "inline";
      stopBtn.current.style.display = "none";
    }
  });
  const nextLang = () => {
    setLang(lang === 2 ? 0 : lang + 1);
  };
  return (
    <div
      ref={btnRef}
      className={disable ? "voice-wrap voice-hide" : "voice-wrap"}>
      <div className="lang" onClick={nextLang}>
        <p>{langArr[lang]}</p>
      </div>
      <button
        ref={stopBtn}
        id="stop-record-btn"
        title="Stop Dictation"
        onClick={onClick}
        onMouseDown={(e) => {
          if (e.button === 1) nextLang();
        }}>
        <FaMicrophoneSlash />
      </button>
      <button
        ref={startBtn}
        id="start-record-btn"
        onClick={onClick}
        title="Start Dictation">
        <FaMicrophone />
      </button>
    </div>
  );
};

export default VoiceBtns;
