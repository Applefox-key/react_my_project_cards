import React from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BsPhoneFlip } from "react-icons/bs";
import cl from "./BackBtn.module.scss";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const SwitchModeBtn = ({ ...props }) => {
  const router = useNavigate();
  const curPuth = useLocation().pathname;
  const mode = useParams().mode;
  const change = () => {
    const newModeValue = 1 - parseInt(mode);
    const newPath = curPuth.replace(
      new RegExp(`/${parseInt(mode)}/`),
      `/${newModeValue}/`
    );

    router(newPath, { replace: true });
  };

  return (
    <>
      {!window.document.getElementById("gameresult") && (
        <SwitchTransition>
          <CSSTransition
            key={window.location.pathname}
            timeout={200}
            classNames={"endl"}>
            <Button
              className={cl.btnGame}
              size="lg"
              variant="dark"
              onClick={change}
              title={`game mode: ${
                props.modes[parseInt(mode)]
              }. RESTART with change mode to the ${
                props.modes[1 - parseInt(mode)]
              }`}
              {...props}>
              <BsPhoneFlip />
              <span className={cl.endlesTitle}>FLIP SIDE</span>
              <span className={cl.endlesName}> {parseInt(mode) + 1}</span>
            </Button>
          </CSSTransition>
        </SwitchTransition>
      )}
    </>
  );
};

export default SwitchModeBtn;
