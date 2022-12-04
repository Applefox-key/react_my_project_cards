import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const MyInputGroup = ({ children, label, classgroup, ...props }) => {
  return (
    <InputGroup className={"mb-3 " + classgroup}>
      {label ? <InputGroup.Text> {label}</InputGroup.Text> : <></>}
      <Form.Control {...props} aria-label={props.placeholder} />

      {children}
    </InputGroup>
  );
};

export default MyInputGroup;
