import React from "react";
import Modal from "react-bootstrap/Modal";

const MyModal1 = ({
  children,
  showmodal,
  setshowmodal,
  subtitle = "",
  nocloseButton,
  ...props
}) => {
  return (
    <>
      <Modal show={showmodal} onHide={() => setshowmodal(false)} {...props}>
        <Modal.Header closeButton={!nocloseButton}>
          {props.title && (
            <Modal.Title className="w-100">{props.title}</Modal.Title>
          )}
        </Modal.Header>
        {props.subtitle && (
          <div className="d-flex justify-content-center align-items-center">
            <h5 className="text-center">{props.subtitle}</h5>
          </div>
        )}
        <Modal.Body className="pt-0">{children}</Modal.Body>
      </Modal>
    </>
  );
};

export default MyModal1;
