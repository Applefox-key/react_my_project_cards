import React, { useRef } from "react";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "../../../styles/collectMenu.scss";

import { usePopup } from "../../../hooks/usePopup";
import { contentFromTxtFile } from "../../../utils/files";
import { editCollectionHlp } from "../../../utils/editCollectionHlp";
import ModalFileContentBtns from "../addContent/ModalFileContentBtns";
import ContentFromFile from "../addContent/ContentFromFile";
import FilterByCategory from "../../CategorySelection/FilterByCategory";
import ModalCustom from "../../UI/ModalCustom/ModalCustom";

const CollectionEditModal = ({
  collection = {},
  isNew,
  setIsEdit,
  onHide,
  changeAttr,
  setReorgMode = null,
}) => {
  const [content, setContent] = useState();
  const [fromFile, setFromFile] = useState(false);
  const [newName, setNewName] = useState(collection ? collection.name : "");
  const [newNote, setNote] = useState(collection ? collection.note : "");
  const [category, setCategory] = useState(
    collection
      ? {
          id: collection.categoryid,
          name: collection.category,
        }
      : ""
  );
  const route = useNavigate();
  const setPopup = usePopup();
  const saveChanges = async () => {
    try {
      const res = await editCollectionHlp({
        newName,
        newNote,
        category,
        content,
        isNew,
        collection,
      });
      if (!isNew) {
        let newV = category.id !== collection.categoryid ? { category } : {};
        if (newNote !== collection.note) newV.note = newNote;
        changeAttr(newV);
        route(`/collections/my/${collection.id}/${newName.trim()}`);
      }

      if (res) route(`/collections/my/${res}/${newName.trim()}`);
      else route(`/collections/my/${collection.id}/${newName.trim()}`);
      setIsEdit(false);
    } catch (error) {
      setPopup.error(error.message);
    }
  };
  const setCateg = async (cat = "") => {
    setCategory({
      id: cat === "" ? "" : cat.id,
      name: cat === "" ? "" : cat.name,
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
    <ModalCustom
      onHide={onHide ? onHide : (e) => setIsEdit(false)}
      showmodal
      setshowmodal={setIsEdit}
      size="lg"
      fullscreen={!!inputFileName.current}
      dialogClassName="modal-h100"
      title={"Collection's properties"}>
      <div className="d-flex flex-column justify-content-center  w-100">
        <div className="d-flex flex-column justify-content-center align-items-center w-100">
          <div className="input_with_lable mt-4">
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
        <div className={isNew ? "" : "justify-content-end"}>
          <div className="select_wrap">
            <FilterByCategory
              isForFilter={false}
              onSelect={setCateg}
              colCat={{
                id: category.id,
                name: category.name,
              }}
            />{" "}
            {isNew && (
              <Form.Check
                className="fs-4"
                id={`isfile`}
                onChange={() => setFromFile(!fromFile)}
                label={`import from file`}
              />
            )}
            {!fromFile && (
              <div className="edit_btn_menu">
                {!isNew && setReorgMode !== null && (
                  <Button
                    size="lg"
                    variant="light"
                    disabled={!newName && isNew}
                    onClick={() => {
                      setReorgMode(true);
                      setIsEdit(false);
                    }}>
                    ORGANIZE
                  </Button>
                )}
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
          </div>{" "}
        </div>
        {fromFile && (
          <div>
            <ModalFileContentBtns
              inputFileName={inputFileName}
              FileChange={FileChange}
            />
            {!!inputFileName.current && (
              <ContentFromFile
                fileContent={content}
                addToColection={saveChanges}
              />
            )}
          </div>
        )}
      </div>
    </ModalCustom>
  );
};

export default CollectionEditModal;
