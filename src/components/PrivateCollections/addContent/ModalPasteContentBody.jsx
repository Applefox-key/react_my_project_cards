import React, { useState } from "react";
import MyTable from "../../UI/table/MyTable";

const ModalPasteContentBody = ({
  dataArr,
  dataStr,
  setDataStr,
  setDataArr,
  tab,
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
        <div className="flex-center flex-wrap">
          <textarea
            rows="10"
            value={dataStr.one}
            placeholder={
              tab === "tab1"
                ? "question ; answer ; note"
                : tab === "tab2"
                ? "questions"
                : `question
answer`
            }
            onChange={(e) => {
              setDataStr({ ...dataStr, one: e.target.value });
            }}
            className={tab === "tab2" ? "w-40 h-100 fs-4" : "w-100 h-100 fs-4"}
          />
          {tab === "tab2" && (
            <textarea
              rows="10"
              value={dataStr.two}
              placeholder="answers"
              onChange={(e) => {
                setDataStr({ ...dataStr, two: e.target.value });
              }}
              className="w-40 h-100 fs-4"
            />
          )}
        </div>
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
