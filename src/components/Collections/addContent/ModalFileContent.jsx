import React, { useState, useRef } from "react";

import MyModal from "../../UI/MyModal";

import BaseAPI from "../../../API/BaseAPI";
import FromFile from "./FromFile";

const ModalFileContent = ({ setVisible, setContent, colId }) => {
  const [fileContent, setFileContent] = useState();

  const inputFileName = useRef();

  const addToColection = async () => {
    if (!fileContent) return;

    await BaseAPI.createContentFromArray(fileContent, colId);
    setContent(await BaseAPI.getContent(colId));

    setFileContent([]);
    inputFileName.current.value = "";
    setVisible(false);
  };

  return (
    <MyModal
      showmodal
      setshowmodal={setVisible}
      fullscreen
      size="md"
      dialogClassName="h100"
      title={"Add new content from .txt or .xls file"}>
      <FromFile
        content={fileContent}
        setContent={setFileContent}
        saveChanges={addToColection}
        cancel={() => {
          setFileContent(null);
          setVisible(false);
        }}
      />
    </MyModal>
  );
};

export default ModalFileContent;
