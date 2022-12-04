import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import MyInputGroup from "../../UI/MyInput/MyInputGroup";
import MyTable from "../../UI/table/MyTable";
import { usePopup } from "../../../hooks/usePopup";
import MyModal from "../../UI/MyModal";
import BaseAPI from "../../../API/BaseAPI";
import { createFilesDataColl } from "../../../utils/files";

const CollectionShare = ({ colObj, setVisible }) => {
  const [note, setNote] = useState("");
  const [textFile, settextFile] = useState(null);
  const [contentList, setContentList] = useState(colObj.content);
  const [name, setName] = useState(colObj.collection.name);
  const setPopup = usePopup();
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

  const share = async (note, name, trainingList) => {
    try {
      await BaseAPI.createPublicCollection(
        note,
        name.trim(),
        colObj.collection.category,
        trainingList
      );

      setVisible(false);
      setPopup.success("the collection has been shared");
    } catch (error) {
      setPopup.error(error);
    }
  };

  return (
    <MyModal
      title="Share the collection"
      setshowmodal={setVisible}
      // visible={true}
      showmodal={true}>
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
          disabled={!contentList}
          onClick={() => {
            share(note, name, contentList);
          }}>
          Share public collection
        </Button>{" "}
        <Button
          disabled={!contentList}
          onClick={() => {
            createFile(note, name, contentList);
          }}>
          Create file for download
        </Button>
        {textFile ? (
          <a download={name} href={textFile}>
            Download
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
