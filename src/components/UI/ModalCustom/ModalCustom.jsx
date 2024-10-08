import React from "react";
import Draggable from "react-draggable";
import { IoIosClose } from "react-icons/io";

import cl from "./ModalCustom.module.scss";

const ModalCustom = ({
  showmodal,
  setshowmodal,
  nocloseButton,
  subtitle = "",
  ...props
}) => {
  const { fullscreen } = props;

  const closeWin = (e) => {
    e.stopPropagation();
    setshowmodal(false);
  };
  const getClassName = () =>
    ["handle", cl["modal-header"], nocloseButton ? "" : cl.noBtn].join(" ");

  const content = (
    <div className={fullscreen ? cl["modalbox-fullscreen"] : cl["modalbox"]}>
      <div className={cl.contentbox} onClick={(e) => e.stopPropagation()}>
        <div className={getClassName()}>
          {props.title && <div>{props.title}</div>}
        </div>
        {!nocloseButton && (
          <IoIosClose className={cl["btn-back"]} onClick={closeWin} />
        )}
        {props.subtitle && (
          <div className="d-flex justify-content-center align-items-center">
            <h5 className="text-center">{props.subtitle}</h5>
          </div>
        )}
        <div className={cl["modal-body"]}>{props.children}</div>
      </div>
    </div>
  );

  return (
    <>
      {fullscreen ? (
        <div className={[cl["modal-wrap"], cl.margT].join(" ")}>{content} </div>
      ) : (
        <div className={cl["modal-wrap"]} onClick={closeWin}>
          <Draggable
            handle=".handle"
            defaultPosition={{
              x: window.visualViewport.width * 0.1,
              y: window.visualViewport.height * 0.1,
            }}>
            {content}
          </Draggable>{" "}
        </div>
      )}
    </>
  );
};

export default ModalCustom;
