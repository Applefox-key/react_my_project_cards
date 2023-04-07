import React from "react";
import cl from "./Games.module.scss";
import { getImgA } from "../../utils/contentRequests";

const TestOptions = ({ items, onClick, active, right }) => {
  const imgEl = (el) => {
    let imgurl = getImgA(el);
    return imgurl ? <img src={imgurl} alt="img" /> : <></>;
  };
  const generateClassName = (el) => {
    return [
      cl.list_btn,
      active.includes(el.id.toString()) ? cl.wrong_answer : "",
      right === el.id.toString() ? cl.right_answer : "",
    ].join(" ");
  };

  return (
    <div className="flex-center flex-wrap">
      {items.map((el) => (
        <button
          key={el.id}
          id={el.id}
          onClick={onClick}
          disabled={right !== el.id.toString() && right}
          className={generateClassName(el)}>
          {imgEl(el)}
          {el.answer}
        </button>
      ))}
    </div>
  );
};

export default TestOptions;
