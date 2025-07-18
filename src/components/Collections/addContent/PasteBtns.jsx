import React from "react";
import Button from "react-bootstrap/esm/Button";

const PasteBtns = ({ dataArray, actions }) => {
  return (
    <div className="pt-2 fs-4">
      {!dataArray ? (
        <Button
          size="lg"
          variant="light"
          className="btn-dialog"
          onClick={actions.read}>
          Next step
        </Button>
      ) : (
        <>
          <Button
            size="lg"
            className="btn-dialog"
            variant="light"
            onClick={actions.back}>
            Step back
          </Button>{" "}
          <Button
            size="lg"
            className="btn-dialog"
            variant="light"
            onClick={actions.add}>
            Add content
          </Button>
        </>
      )}
    </div>
  );
};

export default PasteBtns;
