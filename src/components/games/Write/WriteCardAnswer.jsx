import React from "react";
import cl from "../Games.module.scss";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

const WriteCardAnswer = ({ answer, setAnswer, check, isVoice, voiceClick }) => {
  return (
    <div className={cl.writeBox}>
      <textarea
        type={"text"}
        id="answerArea"
        value={answer}
        className={cl.writeAnswer}
        onMouseDown={(e) => {
          if (e.button === 1) {
            e.preventDefault();
            e.stopPropagation();
            voiceClick();
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            check();
          }
        }}
        onChange={(e) => {
          setAnswer(e.target.value);
        }}
      />{" "}
      {isVoice ? (
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
      )}
    </div>
  );
};

export default WriteCardAnswer;
