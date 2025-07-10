import React from "react";
import { useState } from "react";
import cl from "./MyCard.module.scss";
import { CSSTransition } from "react-transition-group";
import { useEffect } from "react";
import { mainAndImg } from "../../../utils/cardFragment";
import { useStretchingText } from "../../../hooks/useStretchingText";
import BalancerLine from "../Balancer/BalancerLine";
import CardBtn from "./CardBtn";
import VoiceBtns from "../VoiceBtns/VoiceBtns";

const MyCard = ({ mode = "0", ...props }) => {
  const [flipped, setFlipped] = useState(false);
  useEffect(() => {
    if (props.flip !== flipped && props.flip !== undefined)
      setFlipped(!flipped);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.flip]);

  useStretchingText("cardText");

  return (
    <>
      {!!props.item && (
        <div className={cl["card-container"]}>
          {props.progr && (
            <div className={cl["progr"]}>
              <BalancerLine current={props.progr} />
            </div>
          )}
          {props.leftBtn && (
            <CardBtn btnSide="leftbtn" {...{ ...props.leftBtn, flipped }} />
          )}
          {props.rightBtn && (
            <CardBtn btnSide="rightBtn" {...{ ...props.rightBtn, flipped }} />
          )}
          <div
            className={cl["card-button"]}
            onClick={() => {
              if (!props.nonclickable) setFlipped(!flipped);
            }}>
            {!props.noSound && (
              <VoiceBtns
                className={cl.voiceCard}
                text={
                  flipped + mode === "false0" || flipped + mode === "true1"
                    ? props.item.question
                    : props.item.answer
                }
              />
            )}
            <CSSTransition in={!flipped} timeout={1000} classNames="cardFront">
              {mainAndImg("front", mode, props.item, cl)}
            </CSSTransition>
            {!props.onlyFront && (
              <CSSTransition in={flipped} timeout={1000} classNames="cardBack">
                {mainAndImg("back", mode, props.item, cl)}
              </CSSTransition>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MyCard;
