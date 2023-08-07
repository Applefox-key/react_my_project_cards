import React from "react";
import cl from "./Games.module.scss";

const PartAnswer = ({ item, onClick, activeVAL }) => {
  const generateClassName = (el, i) => {
    return [
      cl.list_btn,
      item.answ[i] === activeVAL[i] ? cl.right_answer : cl.wrong_answer,
    ].join(" ");
  };
  return (
    <div>
      <div className={cl["part-answer"]}>
        {activeVAL.map((el, i) => (
          <button
            key={i}
            id={i}
            onClick={onClick}
            disabled={item.answ[i] === activeVAL[i]}
            className={generateClassName(el, i)}>
            {el}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PartAnswer;
