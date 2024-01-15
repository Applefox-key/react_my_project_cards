import React from "react";
import { useState } from "react";
import cl from "./MyCard.module.scss";
import { CSSTransition } from "react-transition-group";
import { useEffect } from "react";
import { mainAndImg } from "../../../utils/cardFragment";

const MyCard = ({ item, mode = "0", flip, clc = true }) => {
  const [flipped, setFlipped] = useState(false);
  useEffect(() => {
    if (flip !== flipped && flip !== undefined) setFlipped(!flipped);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flip]);
  console.log(item);

  return (
    <>
      <div className={cl["card-container"]}>
        <button
          className={cl["card-button"]}
          onClick={() => {
            if (clc) setFlipped(!flipped);
          }}>
          <CSSTransition in={!flipped} timeout={1000} classNames="cardFront">
            {mainAndImg("front", mode, item, cl)}
          </CSSTransition>
          <CSSTransition in={flipped} timeout={1000} classNames="cardBack">
            {mainAndImg("back", mode, item, cl)}
          </CSSTransition>
        </button>
      </div>
    </>
  );
};

export default MyCard;
