import React from "react";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import BaseAPI from "../../../../API/BaseAPI";
import { useNavigate } from "react-router-dom";
import MyInputGroup from "../../../UI/MyInput/MyInputGroup";
import { onBlurParentCheck } from "../../../../utils/domeElemFunc";
import cl from "../../../styles/collectMenu.scss";

const CollectionRename = ({ collection, cancel }) => {
  const [newName, setNewName] = useState(collection.name);
  const [newNote, setNote] = useState(collection.note);
  const route = useNavigate();

  const rename = async () => {
    let newParam = {};
    if (newName) newParam.name = newName.trim();
    if (newNote) newParam.note = newNote;
    await BaseAPI.editColParam(newParam, collection.id);
    cancel(false);
    route(`/collections/my/${collection.id}/${newName.trim()}`);
  };

  const onBlur = (e) => {
    if (!onBlurParentCheck(e, false, 3)) cancel(false);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") rename();
  };

  return (
    <div>
      <div className="d-flex" onBlur={onBlur}>
        <div>
          <MyInputGroup
            classgroup={cl.renameInput}
            autoFocus
            size="lg"
            label="name"
            placeholder="name"
            onKeyPress={onKeyPress}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <MyInputGroup
            size="lg"
            label="note"
            placeholder="note"
            onKeyPress={onKeyPress}
            value={newNote}
            onChange={(e) => setNote(e.target.value)}></MyInputGroup>
        </div>

        <div>
          <Button
            size="lg"
            variant="outline-dark"
            className="mx-2 h-100"
            onClick={rename}>
            OK
          </Button>
          <Button
            size="lg"
            className="h-100"
            variant="outline-dark"
            onClick={(e) => {
              cancel(false);
            }}>
            CANCEL
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CollectionRename;
