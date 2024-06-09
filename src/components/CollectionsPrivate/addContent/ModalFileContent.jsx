import React, { useRef } from "react";
import { useState } from "react";
import ModalFileContentBtns from "./ModalFileContentBtns";
import ContentFromFile from "./ContentFromFile";
import { usePopup } from "../../../hooks/usePopup";
import { contentFromTxtFile } from "../../../utils/files";
import BaseAPI from "../../../API/BaseAPI";
import MyModal from "../../UI/MyModal";
import Popup from "../../UI/popup/Popup";

const ModalFileContent = ({ setVisible, setContent, colId }) => {
  const [fileContent, setFileContent] = useState();
  const setPopup = usePopup();
  const inputFileName = useRef();

  const FileChange = async (e) => {
    try {
      await contentFromTxtFile(e.target.files[0], setFileContent);
    } catch (error) {
      inputFileName.current.value = "";
      setPopup.error(error.message);
      return;
    }
  };

  const addToColection = async () => {
    if (!fileContent) return;
    try {
      await BaseAPI.createContentFromArray(fileContent, colId);
      setContent(await BaseAPI.getContent(colId));

      setFileContent([]);
      inputFileName.current.value = "";
      setVisible(false);
    } catch (error) {
      setPopup.error(error.message);
      return;
    }
  };

  return (
    <MyModal
      showmodal
      setshowmodal={setVisible}
      fullscreen
      size="md"
      dialogClassName="h100"
      title={"Add new content from .txt or .xls file"}>
      <div>
        <Popup />{" "}
      </div>
      <ModalFileContentBtns
        ViewExpressions={addToColection}
        inputFileName={inputFileName}
        FileChange={FileChange}
      />
      <ContentFromFile
        fileContent={fileContent}
        addToColection={addToColection}
      />
    </MyModal>
  );
};

export default ModalFileContent;
