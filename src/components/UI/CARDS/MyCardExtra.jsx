import React from "react";
import { useState } from "react";
import cl from "./MyCard.module.css";
import "./MyCard.module.css";
import { CSSTransition } from "react-transition-group";
import { useEffect } from "react";

const MyCardExtra = ({ item, mode = "0", flip, clc = true }) => {
  const [flipped, setFlipped] = useState(false);
  useEffect(() => {
    if (flip !== flipped && flip !== undefined) setFlipped(!flipped);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flip]);

  const fontS = (tx = "") => {
    const tl = tx.length;
    console.log(tx);
    console.log(tl);

    if (tl < 12) return "14vw";
    if (tl <= 60) return "4.7vw";
    if (tl <= 130) return "3.4vw";
    if (tl <= 160) return "3vw";
    if (tl <= 180) return "2.7vw";
    if (tl <= 350) return "2.2vw";
    return "1.7vw";
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
              <h1
                style={{
                  fontSize: fontS(mode === "0" ? item.question : item.answer),
                }}>
                {mode === "0" ? item.question : item.answer}
              </h1>
            </div>
          </CSSTransition>
          <CSSTransition in={flipped} timeout={1000} classNames="cardBack">
            <div className={cl["card-back"]}>
              <h1
                style={{
                  fontSize: fontS(mode === "0" ? item.answer : item.question),
                }}>
                {mode === "0" ? item.answer : item.question}
              </h1>
              <p className="display-5">{item.note}</p>
            </div>
          </CSSTransition>
        </button>
      </div>
    </>
  );
};

export default MyCardExtra;
