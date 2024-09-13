import React from "react";
import Draggable from "react-draggable";
import { IoIosClose } from "react-icons/io";
import cl from "./ModalCustom.module.scss";

const ModalCustom = ({
  children,
  showmodal,
  setshowmodal,
  nocloseButton,
  subtitle = "",
  ...props
}) => {
  console.log(props);
  const { fullscreen } = props;
  console.log(fullscreen);
  const content = (
    <div className={fullscreen ? cl["modalbox-fullscreen"] : cl["modalbox"]}>
      <div className={cl.contentbox} onClick={(e) => e.stopPropagation()}>
        <div
          className={[
            "handle",
            cl["modal-header"],
            nocloseButton ? "" : cl.noBtn,
          ].join(" ")}>
          {props.title && <div>{props.title}</div>}
        </div>
        {!nocloseButton && (
          <IoIosClose
            className={cl["btn-back"]}
            onClick={(e) => {
              e.stopPropagation();
              setshowmodal(false);
            }}
          />
        )}
        {props.subtitle && (
          <div className="d-flex justify-content-center align-items-center">
            <h5 className="text-center">{props.subtitle}</h5>
          </div>
        )}
        <div className={cl["modal-body"]}>{children}</div>
      </div>
    </div>
  );
  return (
    <>
      {fullscreen ? (
        <div className={[cl["modal-wrap"], cl.margT].join(" ")}>{content} </div>
      ) : (
        <div className={cl["modal-wrap"]}>
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
