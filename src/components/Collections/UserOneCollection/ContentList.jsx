import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../../styles/oneCollection.scss";

import { usePopup } from "../../../hooks/usePopup";
import { saveModeAndScroll } from "../../../utils/scrollFn";
import { onePartLittle } from "../../../utils/cardFragment";
import { GO_TO } from "../../../router/routes";
import BaseAPI from "../../../API/BaseAPI";
import Rate from "../../games/Rate";
import { updRates } from "../../../utils/gamesResults";
import { Form } from "react-bootstrap";

const ContentList = ({ content, setContent, pageParam }) => {
  const setPopup = usePopup();
  const route = useNavigate();
  const [editMode, setEditMode] = useState(null);
  const [check, setCheck] = useState(false);

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
      <Form.Check
        type="checkbox"
        checked={check}
        id="showMoreInfo"
        label="show more info"
        onChange={(e) => {
          setCheck(!check);
        }}
      />

      {content && (
        <div className={"listContent" + (check ? " wrapB" : "")}>
          {content.map((el, i) => (
            <div
              key={el.id}
              className={check ? "one-row-more" : "one-row"}
              onClick={(e) => {
                saveModeAndScroll();
                e.stopPropagation();
                rowsActons.editCard(el, e);
              }}>
              <div className="btn-box">
                <button
                  title="Delete row"
                  onClick={(e) => {
                    e.stopPropagation();
                    rowsActons.deleteOne(el, e);
                  }}>
                  ❌
                </button>
              </div>
              <Rate
                isSmall
                initialValue={el.rate}
                action={(newRate) => updRates(el, newRate)}
                classN={"oneStar"}
              />
              {onePartLittle(el, "question", check ? "wrap" : "")}
              {onePartLittle(el, "answer", check ? "wrap" : "")}{" "}
              {check && (
                <div className="tbl_note">
                  <mark>{el.note}</mark>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentList;
