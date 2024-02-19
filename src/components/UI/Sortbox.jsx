import React from "react";
import { Form } from "react-bootstrap";

const Sortbox = ({ options, onChange }) => {
  return (
    <Form.Select
      size="sm"
      onChange={onChange}
      aria-label="Default select example"
      className="wsort m-auto">
      <option>Sort</option>
      {options.map((el, i) => (
        <>
          <option
            key={Math.max(i, 1) * 2 - 1}
            value={(Math.max(i, 1) * 2 - 1).toString()}>
            {el} A➜Z
          </option>
          <option
            key={Math.max(i, 1) * 2}
            value={(Math.max(i, 1) * 2).toString()}>
            {el} Z➜A
          </option>
        </>
      ))}
    </Form.Select>
  );
};

export default Sortbox;
