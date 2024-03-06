import React from "react";
import { useParams } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import MyCard from "../UI/CARDS/MyCard";
import cl from "../UI/CARDS/MyCard.module.scss";
const OneCardG = ({
  anim,
  direction = true,
  item,
  flip,
  clickable = true,
  clgal = "",
  btnLeft,
  btnRight,
}) => {
  const mode = useParams().mode;
  return (
    <>
      <div
        className={clgal ? clgal : cl.container_gallery}
        style={{ display: direction ? "block" : "none" }}>
        <SwitchTransition mode="out-in">
          <CSSTransition key={!anim} timeout={500} classNames="card">
            <MyCard item={item} mode={mode} flip={flip} clc={clickable} />
          </CSSTransition>
        </SwitchTransition>
      </div>
      {
        <div
          className={clgal ? clgal : cl.container_gallery}
          style={{ display: !direction ? "block" : "none" }}>
          <SwitchTransition mode="out-in">
            <CSSTransition key={anim} timeout={500} classNames="card_left">
              <MyCard item={item} mode={mode} flip={flip} clc={clickable} />
            </CSSTransition>
          </SwitchTransition>
        </div>
      }
    </>
  );
};

export default OneCardG;
