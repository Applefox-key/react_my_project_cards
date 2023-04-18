import React, { useRef } from "react";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "../../../styles/collectMenu.scss";
import CategorySelection from "../../CategorySelection/CategorySelection";
import { usePopup } from "../../../hooks/usePopup";
import { contentFromTxtFile } from "../../../utils/files";
import { editCollectionHlp } from "../../../utils/editCollectionHlp";
import ModalFileContentBtns from "../addContent/ModalFileContentBtns";
import ContentFromFile from "../addContent/ContentFromFile";
import MyModal from "../../UI/MyModal";

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
      const res = await editCollectionHlp(
        newName,
        newNote,
        category,
        content,
        isNew,
        collection
      );
      if (!isNew) route(`/collections/my/${collection.id}/${newName.trim()}`);
      if (res) route(`/collections/my/${res}/${newName.trim()}`);
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
      size="lg"
      fullscreen={fromFile}
      dialogClassName="modal-h100"
      title={"Collection's properties"}>
      <div className="d-flex flex-column justify-content-center  w-100">
        {/* <Popup /> */}
        <div className="d-flex flex-column justify-content-center align-items-center w-100">
          <div className="header_modal">
            {isNew && (
              <Form.Check
                className="fs-4"
                id={`isfile`}
                onChange={() => setFromFile(!fromFile)}
                label={`import from file`}
              />
            )}
            <div className="select_wrap w-auto">
              <CategorySelection
                isOne={true}
                onSelect={setCateg}
                colCat={{
                  id: collection.categoryid,
                  name: collection.category,
                }}
              />
            </div>{" "}
          </div>
          <div className="input_with_lable">
            <label htmlFor="i_name" className="lable">
              title:
            </label>
            <input
              autoFocus
              id="i_name"
              placeholder="name: my collection"
              value={newName ? newName : ""}
              onChange={(e) => setNewName(e.target.value)}
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
              value={newNote ? newNote : ""}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
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
          <div className="edit_btn_menu">
            <Button
              size="lg"
              variant="light"
              disabled={!newName && isNew}
              onClick={saveChanges}>
              SAVE CHANGES
            </Button>
            <Button
              size="lg"
              variant="light"
              onClick={(e) => {
                setIsEdit(false);
              }}>
              CANCEL
            </Button>
          </div>
        )}
      </div>
    </MyModal>
  );
};

export default CollectionEditModal;
