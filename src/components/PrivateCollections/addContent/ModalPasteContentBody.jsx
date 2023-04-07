import React, { useState } from "react";
import MyTable from "../../UI/table/MyTable";

const ModalPasteContentBody = ({
  dataArr,
  dataStr,
  setDataStr,
  setDataArr,
}) => {
  const [editMode, setEditMode] = useState(null);

  const editOn = (content) => {
    if (editMode) return;
    setEditMode({
      content: content,
      names: ["question", "answer", "note"],
      edit: editOk,
    });
  };

  const editOk = (newV) => {
    let arr = [...dataArr];
    let ind = arr.findIndex(
      (item) => item.id.toString() === newV.id.toString()
    );
    let content = arr[ind];
    if (newV.question) content.question = newV.question;
    if (newV.answer) content.answer = newV.answer;
    if (newV.note) content.note = newV.note;
    setDataArr(arr);
    setEditMode(null);
  };

  return (
    <div className="h-100">
      {!dataArr ? (
        <textarea
          value={dataStr}
          placeholder="question ; answer ; note"
          onChange={(e) => {
            setDataStr(e.target.value);
          }}
          className="w-100 h-100 fs-4"
        />
      ) : (
        <MyTable
          edit={editMode}
          dataArray={dataArr}
          namesArray={["question", "answer", "note"]}
          onRowClick={editOn}
        />
      )}
    </div>
  );
};

export default ModalPasteContentBody;
