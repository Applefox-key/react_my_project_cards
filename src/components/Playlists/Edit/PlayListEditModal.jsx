import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/collectMenu.scss";
import { usePopup } from "../../../hooks/usePopup";
import EditBody from "./EditBody";
import { editPlaylistHlp } from "../../../utils/editCollectionHlp";
import EditHeader from "./EditHeader";
import ModalCustom from "../../UI/ModalCustom/ModalCustom";

const PlayListEditModal = ({ list, isEdit, setIsEdit, onHide }) => {
  const route = useNavigate();
  const [selectedItems, setSelectedItems] = useState(
    list.collections ? [...list.collections] : []
  );
  const [selectedIds, setSelectedIds] = useState(
    list.collections ? list.collections.map((el) => el.id) : []
  );
  const setPopup = usePopup();

  const saveChanges = async (newName) => {
    try {
      await editPlaylistHlp(newName, selectedIds, list.id);
      route(`/playlist/`);
      setIsEdit(false);
    } catch (error) {
      setPopup.error(error.message);
    }
  };

  const clearSelection = () => {
    setSelectedIds([]);
    setSelectedItems([]);
  };
  const winTitleElement = (
    <div className="flex-standart">
      <span>My library: Playlists</span>
      <span>Choose up to 10 cards sets ({10 - selectedIds.length})</span>
    </div>
  );
  return (
    <ModalCustom
      onHide={onHide ? onHide : (e) => setIsEdit(false)}
      showmodal={isEdit}
      nocloseButton
      setshowmodal={setIsEdit}
      title={winTitleElement}
      fullscreen>
      <EditHeader
        list={list}
        fns={{ clearSelection, saveChanges, setIsEdit }}
      />
      <EditBody
        items={{ selectedItems, setSelectedItems }}
        ids={{ selectedIds, setSelectedIds }}
      />
    </ModalCustom>
  );
};

export default PlayListEditModal;
