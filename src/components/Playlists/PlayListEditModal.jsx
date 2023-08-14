import React from "react";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/collectMenu.scss";

import { usePopup } from "../../hooks/usePopup";
import MyModal from "../UI/MyModal";
import AllCollectionsList from "./AllCollectionsList";
import { editPlaylistHlp } from "../../utils/editCollectionHlp";

const PlayListEditModal = ({ list, isEdit, setIsEdit, onHide }) => {
  const route = useNavigate();
  const [newName, setNewName] = useState(list.name ? list.name : "");
  const [selectedIds, setSelectedIds] = useState(
    list.collections ? list.collections.map((el) => el.id) : []
  );
  const setPopup = usePopup();

  const saveChanges = async () => {
    try {
      await editPlaylistHlp(newName, selectedIds, list.id);
      route(`/playlist/`);
      setIsEdit(false);
    } catch (error) {
      setPopup.error(error.message);
    }
  };

  return (
    <MyModal
      onHide={onHide ? onHide : (e) => setIsEdit(false)}
      showmodal={isEdit}
      setshowmodal={setIsEdit}
      size="lg"
      dialogClassName="modal-h100"
      title={"Playlist properties"}>
      <div className="d-flex flex-column justify-content-center  w-100">
        <div className="d-flex flex-column justify-content-center align-items-center w-100">
          <div className="input_with_lable">
            <label htmlFor="i_name" className="lable">
              title:
            </label>
            <input
              autoFocus
              id="i_name"
              placeholder="name: my playlist"
              value={newName ? newName : ""}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <AllCollectionsList
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        </div>
        <div className="edit_btn_menu">
          <Button
            size="lg"
            variant="light"
            disabled={!newName && list.id === "new"}
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
      </div>
    </MyModal>
  );
};

export default PlayListEditModal;
