import React from "react";
import { useParams } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import MyCard from "../UI/CARDS/MyCard";
import cl from "../UI/CARDS/MyCard.module.scss";
const OneCardG = ({ anim, direction = true, ...props }) => {
  const mode = useParams().mode;
  return (
    <>
      <div
        className={props.clgal ? props.clgal : cl.container_gallery}
        style={{ display: direction ? "block" : "none" }}>
        <SwitchTransition mode="out-in">
          <CSSTransition key={!anim} timeout={500} classNames="card">
            <MyCard mode={mode} {...props} />
          </CSSTransition>
        </SwitchTransition>
      </div>
      {props.twoDir && (
        <div
          className={props.clgal ? props.clgal : cl.container_gallery}
          style={{ display: !direction ? "block" : "none" }}>
          <SwitchTransition mode="out-in">
            <CSSTransition key={anim} timeout={500} classNames="card_left">
              <MyCard mode={mode} {...props} />
            </CSSTransition>
          </SwitchTransition>
        </div>
      )}
    </>
  );
};

export default OneCardG;
