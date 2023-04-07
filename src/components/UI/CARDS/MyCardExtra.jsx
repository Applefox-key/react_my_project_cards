import React from "react";
import { useState } from "react";
import cl from "./MyCard.module.scss";
// import "./MyCard.module.scss";
import { CSSTransition } from "react-transition-group";
import { useEffect } from "react";
import { getImgA, getImgQ } from "../../../utils/contentRequests";

const MyCardExtra = ({ item, mode = "0", flip, clc = true }) => {
  const [flipped, setFlipped] = useState(false);
  useEffect(() => {
    if (flip !== flipped && flip !== undefined) setFlipped(!flipped);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flip]);

  const fontS = ([tx, ti]) => {
    const tl = tx.length;

    if (ti) {
      if (tl < 6) return "7vw";
      if (tl <= 60) return "2.7vw";
      if (tl <= 130) return "1.7vw";
      if (tl <= 160) return "1.5vw";
      if (tl <= 180) return "1.8vw";
      if (tl <= 350) return "1.1vw";
      return "0.8vw";
    } else {
      if (tl < 12) return "13vw";
      if (tl <= 60) return "4.7vw";
      if (tl <= 130) return "3.4vw";
      if (tl <= 160) return "3vw";
      if (tl <= 180) return "2.7vw";
      if (tl <= 350) return "2.2vw";
      return "1.7vw";
    }
  };

  return (
    <>
      <div className={cl["card-container"]}>
        <button
          className={cl["card-button"]}
          onClick={() => {
            if (clc) setFlipped(!flipped);
          }}>
          <CSSTransition in={!flipped} timeout={1000} classNames={"cardFront"}>
            <div className={cl["card-front"]}>
              {mode === "0"
                ? item.imgQ && <img src={getImgQ(item)} alt="" />
                : item.imgA && <img src={getImgA(item)} alt="" />}
              <h1
                style={{
                  fontSize: fontS(
                    mode === "0"
                      ? [item.question, item.imgQ]
                      : [item.answer, item.imgA]
                  ),
                }}>
                {mode === "0" ? item.question : item.answer}
              </h1>
            </div>
          </CSSTransition>
          <CSSTransition in={flipped} timeout={1000} classNames="cardBack">
            <div className={cl["card-back"]}>
              {" "}
              {mode === "0"
                ? item.imgA && <img src={getImgA(item)} alt="" />
                : item.imgQ && <img src={getImgQ(item)} alt="" />}
              <h1
                style={{
                  fontSize: fontS(
                    mode === "0"
                      ? [item.answer, item.imgA]
                      : [item.question, item.imgQ]
                  ),
                }}>
                {mode === "0" ? item.answer : item.question}
              </h1>
              {item.note && <p className={cl["card-note"]}>{item.note}</p>}
            </div>
          </CSSTransition>
        </button>
      </div>
    </>
  );
};

export default MyCardExtra;
