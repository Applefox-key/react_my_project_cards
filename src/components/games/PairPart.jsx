import React from "react";
import cl from "./Games.module.scss";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getImgA, getImgQ } from "../../utils/contentRequests";

const PairPart = ({ items, onClick, num, active }) => {
  const imgEl = (el) => {
    let imgurl = num === 1 ? getImgQ(el) : getImgA(el);
    return imgurl ? <img src={imgurl} alt="img" /> : <></>;
  };
  const generateClassName = (el) => {
    return [
      cl.list_btn,
      num === 2 ? cl.answer : "",
      active === el.id + "&" + num ? cl["active"] : "",
    ].join(" ");
  };

  return (
    <TransitionGroup
      className={cl.container + " flex-wrap justify-content-center"}>
      {items.map((el) => (
        <CSSTransition timeout={400} classNames="pair" key={el.id + "&" + num}>
          <button
            className={generateClassName(el)}
            id={el.id + "&" + num}
            onClick={onClick}>
            {imgEl(el)}
            {el[num === 1 ? "question" : "answer"]}
          </button>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default PairPart;
