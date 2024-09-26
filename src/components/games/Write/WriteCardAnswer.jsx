import React, { useRef } from "react";
import cl from "../Games.module.scss";

import VoiceBtns from "../../UI/VoiceBtns";

const WriteCardAnswer = ({ answer, setAnswer, check }) => {
  const textRef = useRef(null);
  return (
    <div className={cl.writeBox}>
      <textarea
        type={"text"}
        id="answerArea"
        ref={textRef}
        value={answer}
        className={cl.writeAnswer}
        // onMouseDown={(e) => {
        //   if (e.button === 1) {
        //     e.preventDefault();
        //     e.stopPropagation();
        //     voiceClick();
        //   }
        // }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            check();
          }
        }}
        onChange={(e) => {
          setAnswer(e.target.value);
        }}
      />
      <VoiceBtns textRef={textRef} setAnswer={setAnswer} />
      {/* {isVoice ? (
        <button
          id="stop-record-btn"
          title="Stop Dictation"
          onClick={voiceClick}>
          <FaMicrophoneSlash />
        </button>
      ) : (
        <button
          id="start-record-btn"
          onClick={voiceClick}
          title="Start Dictation">
          <FaMicrophone />
        </button>
      )} */}
    </div>
  );
};

export default WriteCardAnswer;
