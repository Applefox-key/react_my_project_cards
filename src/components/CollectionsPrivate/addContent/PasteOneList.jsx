import React from "react";
import { Form } from "react-bootstrap";

const PasteOneList = ({ options, separator, setSeparator }) => {
  return (
    <div className="d-flex fs-4 justify-content-end">
      <Form.Check
        type="checkbox"
        checked={options.check}
        label="Automatically determine the column name"
        onChange={(e) => {
          options.setCheck(e.target.checked);
        }}
      />{" "}
      <label htmlFor="sep" className="ms-5">
        Separator
      </label>
      <input
        style={{ width: "3rem" }}
        type="text"
        id="sep"
        value={separator}
        onChange={(e) => {
          setSeparator(e.target.value);
        }}
      />
    </div>
  );
};

export default PasteOneList;
