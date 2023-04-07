import React from "react";
import cl from "./Games.module.scss";
import { Badge } from "react-bootstrap";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const GameCountBage = ({ value, lable, bg, text }) => {
  return (
    <SwitchTransition>
      <CSSTransition key={value} timeout={200} classNames={"count"}>
        <button size="lg" variant="light" className={cl.countBtn}>
          <Badge text={text} bg={bg}>
            {lable}
            {value}
          </Badge>
        </button>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default GameCountBage;
