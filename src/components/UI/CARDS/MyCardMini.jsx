import React from "react";
import { useState } from "react";
import cl from "./MyCard.module.css";
import "./MyCard.module.css";
import { CSSTransition } from "react-transition-group";
import { useEffect } from "react";

const MyCardMini = ({ item, mode = "0", flip, clc = true }) => {
  const [flipped, setFlipped] = useState(false);
  useEffect(() => {
    if (flip !== flipped && flip !== undefined) setFlipped(!flipped);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flip]);

  return (
    <div className={cl.container_gallerymini}>
      <div className={cl["card-containermini"]}>
        <button
          className={cl["card-button"]}
          onClick={() => {
            if (clc) setFlipped(!flipped);
          }}>
          <CSSTransition in={!flipped} timeout={1000} classNames={"cardFront"}>
            <div className={cl["card-front"]}>
              <h1
                className={cl["cardFontSizemini"]}
                // style={{ fontSize: showDivWidth() }}
                // className={["display-" + (mode === 0 ? 1 : 5), cl.text1].join(
                //   " "
                // )}
              >
                {mode === "0" ? item.question : item.answer}
              </h1>
            </div>
          </CSSTransition>
          <CSSTransition in={flipped} timeout={1000} classNames="cardBack">
            <div className={cl["card-back"]}>
              <h1
                className={cl["cardFontSizemini"]}
                // className={["display-" + (mode === 0 ? 1 : 5), cl.text1].join(
                //   " "
                // )}
              >
                {mode === "0" ? item.answer : item.question}
              </h1>
              <p className="display-5">{item.note}</p>
            </div>
          </CSSTransition>
        </button>
      </div>
    </div>
  );
};

export default MyCardMini;
