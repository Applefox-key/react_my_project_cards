import React from "react";
import { InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";

const ModalFileContentBtns = ({ inputFileName, FileChange }) => {
  return (
    <div className="d-flex">
      <InputGroup>
        <Form.Control
          size="lg"
          className="mt-1"
          ref={inputFileName}
          type="file"
          onChange={FileChange}
        />
      </InputGroup>{" "}
      <OverlayTrigger
        placement={"top"}
        overlay={
          <Tooltip>
            semicolon as separator between question, answer and the note.
            arrange the each set in a separate line: question; answer; note
          </Tooltip>
        }>
        <Button size="lg" className="mt-1" variant="outline-secondary">
          ?
        </Button>
      </OverlayTrigger>
    </div>
  );
};

export default ModalFileContentBtns;
