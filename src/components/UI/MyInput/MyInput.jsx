import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";

const MyInput = ({ name, content, callback = null, onblur, onEnter = "" }) => {
  const [value, setValue] = useState(content === null ? "" : content);

  return (
    <Form.Control
      className="fs-4"
      autoFocus
      aria-label={name}
      value={value}
      onBlur={onblur}
      placeholder={name}
      onClick={(e) => {
        e.stopPropagation();
      }}
      onKeyDown={(e) => {
        if (!onEnter) return;
        if (e.key === "Enter") onEnter();
      }}
      onChange={(e) => {
        e.stopPropagation();
        setValue(e.target.value);
        callback(e);
      }}
      aria-describedby="basic-addon1"
    />
  );
};

export default MyInput;
