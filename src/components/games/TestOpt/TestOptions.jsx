import React from "react";

import cl from "../Games.module.scss";

import { getImgA, getImgQ } from "../../../utils/contentRequests";
import { fontLittle } from "../../../utils/texts";

const TestOptions = ({ items, onClick, active, right, mode }) => {
  const imgEl = (el) => {
    let imgurl = mode ? getImgQ(el) : getImgA(el);
    let textAQ = mode ? el.question : el.answer;
    return imgurl ? (
      <img src={imgurl} alt="img" className={!textAQ ? cl["imgOnly"] : ""} />
    ) : (
      <></>
    );
  };
  const generateClassName = (el) => {
    return [
      cl.list_btn,
      fontLittle(mode ? [el.question, el.imgQ] : [el.answer, el.imgA]),
      active.includes(el.id.toString()) ? cl.wrong_answer : "",
      right === el.id.toString() ? cl.right_answer : "",
    ].join(" ");
  };

  return (
    <div className={cl["test-options"]}>
      {items.map((el) => (
        <button
          key={el.id}
          id={el.id}
          onClick={onClick}
          disabled={
            right !== el.id.toString() && active.includes(el.id.toString())
          }
          className={generateClassName(el)}>
          {imgEl(el)}
          {mode ? el.question : el.answer}
        </button>
      ))}
    </div>
  );
};

export default TestOptions;
