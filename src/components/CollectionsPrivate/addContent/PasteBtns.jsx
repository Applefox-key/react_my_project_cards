import React from "react";
import Button from "react-bootstrap/esm/Button";

const PasteBtns = ({ dataArray, actions }) => {
  return (
    <div className="pt-2 fs-4">
      {!dataArray ? (
        <Button size="lg" onClick={actions.read}>
          Next step
        </Button>
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

export default PasteBtns;
