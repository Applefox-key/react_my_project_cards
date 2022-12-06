import React from "react";
import MyTable from "../../UI/table/MyTable";
import BaseAPI from "../../../API/BaseAPI";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { usePopup } from "../../../hooks/usePopup";

const TableContent = ({ content, setContent, pageParam }) => {
  const setPopup = usePopup();
  const route = useNavigate();
  const [editMode, setEditMode] = useState(null);

  const editOn = (content) => {
    setEditMode({
      content: content,
      names: ["question", "answer", "note"],
      edit: rowsActons.edit,
    });
  };
  const rowsActons = {
    async addRow() {
      if (editMode) return;
      const newEl = {
        id: "new",
        collectionid: pageParam.id,
        question: "",
        answer: "",
        note: "",
      };
      setContent([newEl, ...content]);
      editOn(newEl);
    },
    async add(newC) {
      if (!newC.answer || !newC.question) {
        setPopup.error("please fill in  fields");
        return;
      }

      await BaseAPI.createContent(newC, pageParam.id);
      setEditMode(null);
      try {
        setContent(await BaseAPI.getContent(pageParam.id));
        setPopup.success("content was added");
      } catch (error) {
        setPopup.error(error.message);
      }
    },
    async deleteAll() {
      if (!window.confirm("Delete all?")) return;
      await BaseAPI.deleteColContent(pageParam.id);
      setContent([]);
    },
    async deleteOne(element) {
      if (!window.confirm("Delete?")) return;
      await BaseAPI.deleteContent(element.id);
      let arr = content.filter((elem) => elem.id !== element.id);
      setContent(arr);
    },
    async edit(newV) {
      if (!newV) {
      } else if (newV === "newCancel") {
        setContent(content.filter((el) => el.id !== "new"));
      } else if (newV.id === "new") {
        rowsActons.add(newV);
        return;
      } else {
        await BaseAPI.editContent(newV);
        route(`/collections/my/${pageParam.id}/${pageParam.name}`);
      }
      setEditMode(null);
    },
    openCard(item) {
      route(`/collections/my/${pageParam.id}/${pageParam.name}/${item.id}`);
    },
  };

  return (
    <div className="m-auto" style={{ width: "90%" }}>
      {content && (
        <MyTable
          onRowClick={editOn}
          edit={editMode}
          dataArray={content}
          namesArray={["question", "answer", "note"]}
          btnsArray={[
            { nameMain: "Add row", callback: rowsActons.addRow },
            { nameMain: "Delete all", callback: rowsActons.deleteAll },
            // { name: "Edit", callback: editOn },
            // { name: "Card", callback: rowsActons.openCard },
            {
              name: "🔎",
              callback: rowsActons.openCard,
              variant: "outline-light",
            },
            {
              name: "🗑",
              callback: rowsActons.deleteOne,
              variant: "outline-light",
            },
          ]}
        />
      )}
    </div>
  );
};

export default TableContent;
