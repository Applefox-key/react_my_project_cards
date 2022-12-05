import React from "react";
import Button from "react-bootstrap/esm/Button";

const ColumnHeadWithBtns = ({ btnsArray }) => {
  return (
    <th className="d-flex justify-content-end">
      {btnsArray
        .filter((el) => el.nameMain)
        .map((btn, i) => (
          <Button
            key={i}
            variant="light"
            size="lg"
            onClick={(e) => {
              e.stopPropagation();
              btn.callback();
            }}>
            {btn.nameMain}
          </Button>
        ))}
    </th>
  );
};

export default ColumnHeadWithBtns;
