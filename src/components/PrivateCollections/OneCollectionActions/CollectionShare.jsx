import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import MyInputGroup from "../../UI/MyInput/MyInputGroup";
import MyTable from "../../UI/table/MyTable";

import MyModal from "../../UI/MyModal";

import { createFilesDataColl } from "../../../utils/files";

const CollectionShare = ({ colObj, setVisible }) => {
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
      // visible={true}
      showmodal={true}
      dialogClassName="width100wv">
      <div>
        <MyInputGroup
          label="Collection name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />{" "}
        <MyInputGroup
          label="Note"
          type="text"
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
          }}
        />
        <Button
          className="fs-5 menuBtn"
          size="lg"
          variant="outline-primary"
          disabled={!contentList}
          onClick={() => {
            createFile(contentList);
          }}>
          💾Create file for download
        </Button>{" "}
        {textFile ? (
          <a download={name} href={textFile} className="fs-4">
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

export default CollectionShare;
