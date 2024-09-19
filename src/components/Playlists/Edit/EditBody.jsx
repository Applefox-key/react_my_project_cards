import React, { useState } from "react";
import cl from "../PlayLists.module.scss";
import SetOfTen from "./SetOfTen";
import ListToChoose from "./ListToChoose";
import { playlistSetMax } from "../../../constants/defaultSettings";

const EditBody = ({ items, ids }) => {
  const [show, setShow] = useState(false);
  const { selectedItems, setSelectedItems } = items;
  const { selectedIds, setSelectedIds } = ids;

  const handleSelectAll = (filtredList) => {
    const allItems = filtredList.filter(
      (el) => el.id && !selectedIds.includes(el.id)
    );
    const allIds = allItems.map((item) => item.id);
    if (selectedIds.length + allIds.length === playlistSetMax) setShow(false);

    setSelectedIds([...allIds, ...(selectedIds.length ? selectedIds : [])]);
    setSelectedItems([
      ...allItems,
      ...(selectedItems.length ? selectedItems : []),
    ]);
  };
  const handleClick = () => {
    setShow(!show);
  };
  const handleItemClick = (elem) => {
    if (playlistSetMax === selectedIds.length && !selectedIds.includes(elem.id))
      return;
    const isExist = selectedIds.includes(elem.id);
    setSelectedItems(
      isExist
        ? selectedItems.filter((item) => item.id !== elem.id)
        : [elem, ...selectedItems]
    );

    setSelectedIds((prevIds) => {
      if (prevIds.includes(elem.id)) {
        return prevIds.filter((prevId) => prevId !== elem.id);
      } else {
        return [elem.id, ...prevIds];
      }
    });

    if (!isExist && playlistSetMax === selectedIds.length + 1) setShow(false);
  };

  return (
    <>
      <div className={cl["body-edit-wrap"]}>
        <SetOfTen
          onClickFns={{ handleItemClick, handleClick }}
          selectedItems={selectedItems}
          show={show}
        />
        <ListToChoose
          selectedIds={selectedIds}
          show={show}
          onClickFns={{ handleItemClick, handleSelectAll }}
        />
      </div>
    </>
  );
};

export default EditBody;
