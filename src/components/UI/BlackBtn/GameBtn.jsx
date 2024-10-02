import React, { useState } from "react";
import { Button } from "react-bootstrap";
import cl from "./BackBtn.module.scss";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const GameBtn = ({ children, title, onClick }) => {
  const [keyAnim, setkeyAnim] = useState(false);
  const onHandleClick = () => {
    setkeyAnim(!keyAnim);
    onClick();
  };
  return (
    <>
      {!window.document.getElementById("gameresult") && (
        <SwitchTransition>
          <CSSTransition key={keyAnim} timeout={200} classNames={"endl"}>
            <Button
              className={cl.btnGame}
              size="lg"
              variant="dark"
              onClick={onHandleClick}
              title={title}>
              {children ? children : title}
            </Button>
          </CSSTransition>
        </SwitchTransition>
      )}
    </>
  );
};

export default GameBtn;
