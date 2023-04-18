import React from "react";
import Modal from "react-bootstrap/Modal";

const MyModal = ({
  children,
  showmodal,
  setshowmodal,
  title = "",
  subtitle = "",
  ...props
}) => {
  return (
    <Modal show={showmodal} onHide={() => setshowmodal(false)} {...props}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <div className="d-flex justify-content-center align-items-center">
        <h5 className="text-center">{subtitle}</h5>
      </div>

      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default MyModal;
