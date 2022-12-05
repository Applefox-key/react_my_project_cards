import React from "react";
import Button from "react-bootstrap/esm/Button";

const ColumnWithBtns = ({ btnsArray, content }) => {
  return (
    <>
      {!!btnsArray.length && (
        <td key="btnA" className="d-flex  align-items-center">
          {btnsArray
            .filter((el) => !el.nameMain)
            .map((btn, i) =>
              !btn.isnotbtn ? (
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
              ) : (
                <div key={i}>{btn.callback(content)}</div>
              )
            )}
        </td>
      )}
    </>
  );
};

export default ColumnWithBtns;
