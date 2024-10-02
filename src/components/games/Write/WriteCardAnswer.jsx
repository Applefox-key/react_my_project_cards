import React from "react";
import cl from "../Games.module.scss";

const WriteCardAnswer = ({ textRef, onEnter, clAnsw, children }) => {
  return (
    <div className={cl.writeBox}>
      <textarea
        type={"text"}
        id="answerArea"
        ref={textRef}
        className={clAnsw}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onEnter();
          }
        }}
      />
      {children}
    </div>
  );
};

export default WriteCardAnswer;
