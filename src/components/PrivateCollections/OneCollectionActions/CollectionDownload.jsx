import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import MyTable from "../../UI/table/MyTable";

import MyModal from "../../UI/MyModal";

import { createFilesDataColl } from "../../../utils/files";

const CollectionDownload = ({ colObj, setVisible }) => {
  const [note, setNote] = useState("");
  const [textFile, settextFile] = useState(null);
  const [contentList, setContentList] = useState(colObj.content);
  const [name, setName] = useState(colObj.collection.name);

  const notShare = (expression) => {
    const id = expression.id;
    const arr = contentList.filter((item) => item.id !== id);
    setContentList(arr);
  };

  const createFile = (trainingList) => {
    const data = createFilesDataColl(trainingList);
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }
    settextFile(window.URL.createObjectURL(data));
  };

  return (
    <MyModal
      title="Download the collection"
      setshowmodal={setVisible}
      size="lg"
      showmodal={true}
      dialogClassName="width100wv">
      <div className="w-100">
        <div className="input_with_lable">
          <label htmlFor="i_name" className="lable">
            title:
          </label>
          <input
            autoFocus
            id="i_name"
            placeholder="name: my collection"
            value={name ? name : ""}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input_with_lable">
          <label htmlFor="i_note" className="lable">
            note:
          </label>
          <input
            type="text"
            id="i_note"
            label="Note"
            placeholder="note: my collection with english words"
            value={note ? note : ""}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <Button
          className="fs-4 menuBtn w-50"
          size="lg"
          variant="outline-black"
          disabled={!contentList}
          onClick={() => {
            createFile(contentList);
          }}>
          💾Create file for download
        </Button>{" "}
        {textFile ? (
          <a download={name} href={textFile} className="fs-4 position-absolute">
            🡇 Download
          </a>
        ) : (
          <></>
        )}
        <MyTable
          dataArray={contentList}
          namesArray={["question", "answer", "note"]}
          btnsArray={[{ name: "X", callback: notShare }]}
        />
      </div>
    </MyModal>
  );
};

export default CollectionDownload;
