import React from "react";
import cl from "./Games.module.scss";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getImgA, getImgQ } from "../../utils/contentRequests";
import { fontLittle } from "../../utils/texts";

const PairPart = ({ items, onClick, num, active }) => {
  const imgEl = (el) => {
    let imgurl = num === 1 ? getImgQ(el) : getImgA(el);
    let onlyImg = num === 1 ? el.question : el.answer;
    return imgurl ? (
      <img src={imgurl} alt="img" className={!onlyImg ? cl["imgOnly"] : ""} />
    ) : (
      <></>
    );
  };
  const generateClassName = (el) => {
    const set = num === 2 ? [el.answer, el.imgA] : [el.question, el.imgQ];
    return [
      cl.list_btn,
      fontLittle(set),
      num === 2 ? cl.answer : "",
      active === el.id + "&" + num ? cl["active"] : "",
    ].join(" ");
  };
  // useStretchingText("cardText");
  return (
    <TransitionGroup
      className={cl.container + " flex-wrap justify-content-center mt-5"}>
      {items.map((el) => (
        <CSSTransition timeout={400} classNames="pair" key={el.id + "&" + num}>
          <>
            {/* {active === el.id + "&" + num && el.note && <Hint text="" />} */}
            <button
              className={generateClassName(el)}
              id={el.id + "&" + num}
              onClick={onClick}>
              {imgEl(el)}
              <div className="cardText">
                {el[num === 1 ? "question" : "answer"]}
              </div>
            </button>
          </>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default PairPart;
