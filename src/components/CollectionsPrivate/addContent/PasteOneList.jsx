import React from "react";
import { Form } from "react-bootstrap";

const PasteOneList = ({ options, separator, setSeparator }) => {
  return (
    <div className="separator-box">
      <div>
        <label htmlFor="separatorInp" className="ms-5">
          Separator
        </label>
        <input
          style={{ width: "3rem" }}
          type="text"
          id="separatorInp"
          value={separator}
          onChange={(e) => {
            setSeparator(e.target.value);
          }}
        />
      </div>
      <Form.Check
        type="checkbox"
        checked={options.check}
        label="Automatically determine the column name"
        onChange={(e) => {
          options.setCheck(e.target.checked);
        }}
      />
    </div>
  );
};

export default PasteOneList;
