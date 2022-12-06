import React, { useRef } from "react";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyInputGroup from "../../UI/MyInput/MyInputGroup";
import Form from "react-bootstrap/Form";
import cl from "../menu.module.css";
import CategorySelection from "../../CategorySelection/CategorySelection";
import MyModal from "../../UI/MyModal";

import { usePopup } from "../../../hooks/usePopup";

import { contentFromTxtFile } from "../../../utils/files";

import Popup from "../../UI/popup/Popup";
import { editCollectionHlp } from "../../../utils/editCollectionHlp";
import ModalFileContentBtns from "./addContent/ModalFileContentBtns";
import ContentFromFile from "./addContent/ContentFromFile";

const CollectionEditModal = ({
  collection = {},
  isNew,
  isEdit,
  setIsEdit,
  onHide,
}) => {
  const route = useNavigate();
  const [content, setContent] = useState();
  const [newName, setNewName] = useState(collection ? collection.name : "");
  const [fromFile, setFromFile] = useState(false);
  const [newNote, setNote] = useState(collection ? collection.note : "");
  const setPopup = usePopup();
  const [category, setCategory] = useState(
    collection
      ? {
          id: collection.categoryid,
          name: collection.category,
        }
      : ""
  );

  const saveChanges = async () => {
    try {
      editCollectionHlp(newName, newNote, category, content, isNew, collection);
      if (!isNew) route(`/collections/my/${collection.id}/${newName.trim()}`);
      setIsEdit(false);
    } catch (error) {
      setPopup.error(error.message);
    }
  };
  const setCateg = async (cat = "") => {
    setCategory({
      id: cat.id,
      name: cat.name,
    });
  };
  const inputFileName = useRef();

  const FileChange = async (e) => {
    try {
      await contentFromTxtFile(e.target.files[0], setContent);
      setNewName(e.target.files[0].name.replace(".txt", ""));
    } catch (error) {
      inputFileName.current.value = "";
      setPopup.error(error.message);
      return;
    }
  };
  return (
    <MyModal
      onHide={onHide ? onHide : (e) => setIsEdit(false)}
      showmodal={isEdit}
      setshowmodal={setIsEdit}
      size="md"
      fullscreen={fromFile}
      dialogClassName="h100"
      title={"Collection's properties"}>
      <div>
        <Popup />
        <div className="d-flex justify-content-between">
          <div>
            <MyInputGroup
              classgroup={cl.renameInput}
              autoFocus
              size="lg"
              label="Name"
              placeholder="name: my collection"
              value={newName ? newName : ""}
              onChange={(e) => setNewName(e.target.value)}
            />

            <MyInputGroup
              size="lg"
              label="Note"
              placeholder="note: my collection with english words"
              value={newNote ? newNote : ""}
              onChange={(e) => setNote(e.target.value)}></MyInputGroup>
          </div>
          <div>
            <CategorySelection
              isOne={true}
              onSelect={setCateg}
              colCat={{
                id: collection.categoryid,
                name: collection.category,
              }}
            />
            {isNew && (
              <Form.Check
                className="fs-4"
                id={`isfile`}
                onChange={() => setFromFile(!fromFile)}
                label={`import from file`}
              />
            )}
          </div>{" "}
        </div>{" "}
        {fromFile && (
          <div>
            <ModalFileContentBtns
              inputFileName={inputFileName}
              FileChange={FileChange}
            />{" "}
            <ContentFromFile
              fileContent={content}
              addToColection={saveChanges}
            />
          </div>
        )}
        {!fromFile && (
          <>
            <Button
              size="lg"
              variant="secondary"
              className="mx-2 h-100"
              disabled={!newName && isNew}
              onClick={saveChanges}>
              SAVE CHANGES
            </Button>
            <Button
              size="lg"
              className="h-100"
              variant="secondary"
              onClick={(e) => {
                setIsEdit(false);
              }}>
              CANCEL
            </Button>
          </>
        )}
      </div>
    </MyModal>
  );
};

export default CollectionEditModal;
