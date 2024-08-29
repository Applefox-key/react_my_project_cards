import React from "react";
import { useState } from "react";
import cl from "./MyCard.module.scss";
import { CSSTransition } from "react-transition-group";
import { useEffect } from "react";
import { mainAndImg } from "../../../utils/cardFragment";
import { useStretchingText } from "../../../hooks/useStretchingText";
import BalancerLine from "../Balancer/BalancerLine";

const MyCard = ({ mode = "0", clickable = true, ...props }) => {
  const [flipped, setFlipped] = useState(false);
  useEffect(() => {
    if (props.flip !== flipped && props.flip !== undefined)
      setFlipped(!flipped);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.flip]);

  useStretchingText("cardText");

  useStretchingText("cardangle");

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
            <CSSTransition in={flipped} timeout={800} classNames="cardCArrow">
              <button className={cl.leftbtn} {...props.leftBtn}>
                <div
                  className={
                    props.leftBtn.fontstyleb
                      ? props.leftBtn.fontstyleb
                      : "cardangle pe-2"
                  }>
                  {props.leftBtn.name}
                </div>
              </button>
            </CSSTransition>
          )}
          <button
            className={cl["card-button"]}
            onClick={() => {
              if (clickable) setFlipped(!flipped);
            }}>
            <CSSTransition in={!flipped} timeout={1000} classNames="cardFront">
              {mainAndImg("front", mode, props.item, cl)}
            </CSSTransition>
            <CSSTransition in={flipped} timeout={1000} classNames="cardBack">
              {mainAndImg("back", mode, props.item, cl)}
            </CSSTransition>{" "}
          </button>
          {props.rightBtn && (
            <CSSTransition
              // key={flipped ? "flipped" : "notFlipped"}
              in={flipped}
              timeout={800}
              classNames="cardCArrow">
              <button className={cl.rightBtn} {...props.rightBtn}>
                <div
                  className={
                    props.rightBtn.fontstyleb
                      ? props.rightBtn.fontstyleb
                      : "cardangle pe-2"
                  }>
                  {props.rightBtn.name}
                </div>
              </button>
            </CSSTransition>
          )}
        </div>
      )}
    </>
  );
};

export default MyCard;
