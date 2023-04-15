import React from "react";
import cl from "./Games.module.scss";
import { getImgA } from "../../utils/contentRequests";
import { fontLittle } from "../../utils/texts";

const TestOptions = ({ items, onClick, active, right }) => {
  const imgEl = (el) => {
    let imgurl = getImgA(el);
    return imgurl ? <img src={imgurl} alt="img" /> : <></>;
  };
  const generateClassName = (el) => {
    console.log("ans", el.answer);
    console.log("right", right);

    console.log(right !== el.id.toString() && right);
    return [
      cl.list_btn,
      // cl.right_answer,
      fontLittle([el.answer, el.imgA]),
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
          {el.answer}
        </button>
      ))}
    </div>
  );
};

export default TestOptions;
