import React, { useRef } from "react";
import MyModal from "../../UI/MyModal";
import { useState } from "react";
import Popup from "../../UI/popup/Popup";
import BaseAPI from "../../../API/BaseAPI";
import { contentFromTxtFile } from "../../../utils/files";
import ModalFileContentBtns from "./ModalFileContentBtns";
import { usePopup } from "../../../hooks/usePopup";
import ContentFromFile from "./ContentFromFile";

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
      showmodal={true}
      setshowmodal={setVisible}
      fullscreen
      size="md"
      dialogClassName="h100"
      title={"Add new content from .txt file"}>
      {" "}
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
      {/* <div className="modal-h50">
        {!fileContent ? (
          <></>
        ) : (
          <>
            <Button
              size="lg"
              className="mt-1"
              variant="outline-secondary"
              onClick={addToColection}>
              Add the content
            </Button>
            <MyTable
              dataArray={fileContent}
              namesArray={["question", "answer", "note"]}
            />
          </>
        )}
      </div> */}
    </MyModal>
  );
};

export default ModalFileContent;
