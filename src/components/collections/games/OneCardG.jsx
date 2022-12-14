import React from "react";
import { useParams } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import MyCardExtra from "../../UI/CARDS/MyCardExtra";
import cl from "../../UI/CARDS/MyCard.module.css";
const OneCardG = ({ anim, direction = true, item, flip, clickable = true }) => {
  const mode = useParams().mode;
  return (
    <>
      <div
        // className={"my-3 w-100"}
        className={cl.container_gallery}
        style={{ display: direction ? "block" : "none" }}>
        <SwitchTransition mode="out-in">
          <CSSTransition key={!anim} timeout={500} classNames="card">
            <MyCardExtra item={item} mode={mode} flip={flip} clc={clickable} />
          </CSSTransition>
        </SwitchTransition>
      </div>
      <div
        className={cl.container_gallery}
        style={{ display: !direction ? "block" : "none" }}>
        <SwitchTransition mode="out-in">
          <CSSTransition key={anim} timeout={500} classNames="card_left">
            <MyCardExtra item={item} mode={mode} flip={flip} clc={clickable} />
          </CSSTransition>
        </SwitchTransition>
      </div>
    </>
  );
};

export default OneCardG;
