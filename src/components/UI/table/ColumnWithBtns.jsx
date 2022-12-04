import React from "react";
import Button from "react-bootstrap/esm/Button";

const ColumnWithBtns = ({ btnsArray, content }) => {
  return (
    <td key="btnA">
      {btnsArray
        .filter((el) => !el.nameMain)
        .map((btn, i) => (
          <Button
            key={i}
            variant="link"
            size="lg"
            onClick={(e) => {
              e.stopPropagation();
              btn.callback(content);
            }}>
            {btn.name}
          </Button>
        ))}
    </td>
  );
};

export default ColumnWithBtns;
