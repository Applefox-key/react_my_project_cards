import React, { useState, useEffect } from "react";

import ColumnInput from "./ColumnInput";
import ColumnWithBtns from "./ColumnWithBtns";

const RowContent = ({ content, i, btnsArray, namesArray, edit }) => {
  const [editValue, setEditValue] = useState({ ...content });
  const editNames = edit ? edit.names : [];

  const editOk = () => {
    edit.edit(editValue);
  };
  const editCancel = () => {
    edit.edit(editValue.id === "new" ? "newCancel" : "");
  };

  useEffect(() => {
    if (!editValue.id) {
      setEditValue({ id: content.id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const btnsColumn = edit
    ? [
        { name: "OK", callback: editOk },
        { name: "Cancel", callback: editCancel },
      ]
    : btnsArray;

  const editVal = (e) => {
    e.stopPropagation();
    const col = e.target.ariaLabel;
    const nv = { ...editValue, [col]: e.target.value };
    setEditValue(nv);
  };

  return (
    <>
      <td key="cln">{i + 1}</td>
      {namesArray.map((column) =>
        editNames.includes(column) ? (
          <ColumnInput
            onEnter={editOk}
            editCancel={editCancel}
            edit={edit}
            col={column}
            editVal={editVal}
            key={column}
            autofocus={editNames[0] === column}
          />
        ) : (
          <td
            key={column}
            className={
              column === "question" || column === "name" ? "tbColor" : ""
            }>
            {content[column]}
          </td>
        )
      )}
      {btnsArray && (
        <ColumnWithBtns btnsArray={btnsColumn} content={content} edit={edit} />
      )}
    </>
  );
};

export default RowContent;
