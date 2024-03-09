import React from "react";
import cl from "./Games.module.scss";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const GameCountBage = ({ value, lable, bg, text }) => {
  return (
    <SwitchTransition>
      <CSSTransition key={value} timeout={200} classNames={"count"}>
        <button size="lg" variant="light" className={cl.countBtn}>
          <span text={text} className={cl[bg]}>
            {lable}
            {value}
          </span>
        </button>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default GameCountBage;
// bg={bg}
