import React from "react";
import BaseAPI from "../../../API/BaseAPI";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { usePopup } from "../../../hooks/usePopup";
import "../../../styles/oneCollection.scss";
import { onePartLittle } from "../../../utils/cardFragment";
import { BsSearch } from "react-icons/bs";
import { TbHttpDelete } from "react-icons/tb";
import { GO_TO } from "../../../router/routes";
import { AiOutlineEdit } from "react-icons/ai";

const CardContentList = ({ content, setContent, pageParam }) => {
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
        imgQ: "",
        answer: "",
        imgA: "",
        note: "",
      };
      setContent([newEl, ...content]);
      editOn(newEl);
    },
    async add(newC) {
      if (!newC.answer || !newC.question) {
        setPopup.error("please fill in fields");
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
    editCard(item) {
      route(`${GO_TO.editCard}/${pageParam.id}/${pageParam.name}/${item.id}`);
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
        setContent(content.map((el) => (el.id !== newV.id ? el : newV)));
        route(`/collections/my/${pageParam.id}/${pageParam.name}`);
      }
      setEditMode(null);
    },
    openCard(item) {
      route(`/collections/my/${pageParam.id}/${pageParam.name}/${item.id}`);
    },
  };

  return (
    <div className="listContent-wrap">
      {content && (
        <div className="listContent">
          {content.map((el, i) => (
            <div className="one-row">
              <div className="btn-box">
                {" "}
                <button
                  title="Delete row"
                  onClick={() => rowsActons.deleteOne(el)}>
                  <TbHttpDelete />
                </button>
                <button
                  title="Edit row"
                  onClick={() => rowsActons.editCard(el)}>
                  <AiOutlineEdit />
                </button>
                <button
                  title="view card"
                  onClick={() => rowsActons.openCard(el)}>
                  <BsSearch />
                </button>
              </div>
              {onePartLittle(el, "question")}
              {onePartLittle(el, "answer")}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardContentList;
