import React from "react";
import { Button } from "react-bootstrap";
import Draggable from "react-draggable";
import { IoIosClose } from "react-icons/io";

const MyModalCustom = ({
  children,
  showmodal,
  setshowmodal,
  subtitle = "",
  ...props
}) => {
  return (
    <div className="module-wrap">
      <Draggable handle=".handle">
        <div
          className={
            props.fullscreen
              ? "modalbox-wrap modal-fullscreen"
              : "modalbox-wrap"
          }>
          <div className="editbox" onClick={(e) => e.stopPropagation()}>
            <div className="handle modal-header">
              {props.title && <div>{props.title}</div>}
              <div>
                <Button
                  className="btn-back"
                  onClick={() => setshowmodal(false)}>
                  <IoIosClose />
                </Button>
              </div>
            </div>
            {props.subtitle && (
              <div className="d-flex justify-content-center align-items-center">
                <h5 className="text-center">{props.subtitle}</h5>
              </div>
            )}

            <div className="modal-content">{children}</div>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default MyModalCustom;
