import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";

const ModalPasteBtns = ({ dataArray, actions, options }) => {
  const [separator, setSeparator] = useState(";");
  return (
    <div className="pt-2 fs-4">
      {!dataArray ? (
        <>
          <div className="d-flex">
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
          <Button
            size="lg"
            onClick={() => {
              actions.read(separator);
            }}>
            Next step
          </Button>
        </>
      ) : (
        <>
          <Button size="lg" onClick={actions.back}>
            Step back
          </Button>{" "}
          <Button size="lg" onClick={actions.add}>
            Add content
          </Button>
        </>
      )}
    </div>
  );
};

export default ModalPasteBtns;
