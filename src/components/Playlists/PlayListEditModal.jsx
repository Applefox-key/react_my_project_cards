import React from "react";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/collectMenu.scss";

import { usePopup } from "../../hooks/usePopup";
import MyModal from "../UI/MyModal";
import AllCollectionsList from "./AllCollectionsList";
import { editPlaylistHlp } from "../../utils/editCollectionHlp";
import BtnPlayMenu from "../UI/PlayMenu/BtnPlayMenu";

const PlayListEditModal = ({ list, isEdit, setIsEdit, onHide }) => {
  const route = useNavigate();
  const [newName, setNewName] = useState(list.name ? list.name : "");
  const [selectedItems, setSelectedItems] = useState(
    list.collections ? [...list.collections] : []
  );
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
  const titleWin = () => {
    return (
      <div className="d-flex align-items-center w-100">
        <BtnPlayMenu collection={list} playlist={true} verticals={false} />
        <div className="input_with_lable mb-0">
          <label htmlFor="i_name" className="lable">
            Title:
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
    );
  };
  return (
    <MyModal
      onHide={onHide ? onHide : (e) => setIsEdit(false)}
      showmodal={isEdit}
      setshowmodal={setIsEdit}
      // size="lg"
      title={titleWin()}
      dialogClassName="modal-h100">
      <AllCollectionsList
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
      <div className="editBtnAbs">
        <div className="edit_btn_menu ">
          <Button
            className="mb-0"
            size="lg"
            variant="light"
            disabled={!newName && list.id === "new"}
            onClick={saveChanges}>
            SAVE CHANGES
          </Button>
          <Button
            className="mb-0"
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
