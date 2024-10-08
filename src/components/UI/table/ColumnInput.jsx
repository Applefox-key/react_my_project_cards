import React from "react";
import MyInput from "../MyInput/MyInput";
import { onBlurCheck } from "../../../utils/domeElemFunc";

const ColumnInput = ({
  edit,
  col,
  editVal,
  autofocus,
  editCancel,
  onEnter,
}) => {
  return (
    <td>
      <MyInput
        onEnter={onEnter}
        onblur={(e) => {
          if (!onBlurCheck(e, "tr")) editCancel();
        }}
        name={col}
        content={edit.content[col]}
        callback={editVal}
        autoFocus={autofocus}
      />
    </td>
  );
};

export default ColumnInput;
