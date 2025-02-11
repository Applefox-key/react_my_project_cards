import React, { useRef, useState } from "react";
import ModalFileContentBtns from "./ModalFileContentBtns";
import PrewContentFromFile from "./PrewContentFromFile";
import ContentFromFile from "./ContentFromFile";
import { contentFromFile } from "../../../utils/files";
import { usePopup } from "../../../hooks/usePopup";

const FromFile = ({ content, setContent, saveChanges, setNewName, cancel }) => {
  const inputFileName = useRef();
  const [contentPrew, setContentPrew] = useState(null);
  const setPopup = usePopup();

  const FileChange = async (e) => {
    if (setNewName) setNewName(e.target.files[0].name.replace(".txt", ""));
    try {
      const res = await contentFromFile(e.target.files[0]);
      setContentPrew(res);
    } catch (error) {
      inputFileName.current.value = "";
      setPopup.error(error.message);
      return;
    }
  };
  const contentFromPrew = (prew) => {
    setContentPrew(null);
    setContent(prew);
  };

  const save = () => {
    try {
      saveChanges();
    } catch (error) {
      setPopup.error(error.message);
      return;
    }
  };
  return (
    <div>
      {!contentPrew && !content && (
        <ModalFileContentBtns
          inputFileName={inputFileName}
          FileChange={FileChange}
        />
      )}
      {!!content && (
        <ContentFromFile
          fileContent={content}
          addToColection={save}
          cancel={cancel}
        />
      )}
      {!!contentPrew && (
        <PrewContentFromFile
          setSelectedContent={contentFromPrew}
          dataArray={contentPrew}
        />
      )}
    </div>
  );
};

export default FromFile;
