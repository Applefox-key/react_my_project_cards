import React, { useEffect, useState } from "react";
import "../../../styles/oneCollection.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "../../../hooks/useQuery";
import BaseAPI from "../../../API/BaseAPI";
import MySpinner from "../../UI/MySpinner";

import Button from "react-bootstrap/Button";
import { getImgA, getImgQ } from "../../../utils/contentRequests";
import { GO_TO } from "../../../router/routes";
import { usePopup } from "../../../hooks/usePopup";

const EditCard = () => {
  const [item, setItem] = useState();
  const pageParam = useParams();
  const setPopup = usePopup();
  const router = useNavigate();
  const [getContent, ,] = useQuery(async () => {
    const content =
      pageParam.item === "new"
        ? {
            id: "new",
            collectionid: pageParam.id,
            question: "",
            imgQ: "",
            answer: "",
            imgA: "",
            note: "",
          }
        : await BaseAPI.getContentItem(pageParam.item);
    setItem({ ...content, note: content.note === null ? "" : content.note });
  });
  const route = useNavigate();

  const fromFile = (e) => {
    let img = e.target;
    let column = e.target.id;
    const [file] = img.files;

    if (file) {
      let urlim = URL.createObjectURL(file);
      let newval = { ...item };
      newval[column] = urlim;

      const reader = new FileReader();
      reader.onload = () => {
        let blob = file;
        newval[column + "file"] = blob;
      };
      reader.readAsArrayBuffer(file);

      setItem(newval);
    }
  };
  const save = async () => {
    if (!item) return;
    try {
      if (item.id === "new") await BaseAPI.createContent(item, pageParam.id);
      else await BaseAPI.editContent(item);
      route(`/collections/my/${pageParam.id}/${pageParam.name}`);
    } catch (error) {
      setPopup(error.message);
    }
  };

  useEffect(() => {
    getContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParam]);

  return (
    <form className="big_card_wrap">
      {" "}
      <div className="menuRow">
        {" "}
        <div className="note">
          <h3>NOTE</h3>{" "}
          <input
            type="text"
            value={item ? item.note : ""}
            onChange={(e) => setItem({ ...item, note: e.target.value })}
          />
        </div>
        <Button
          size="lg"
          onClick={() =>
            router(`${GO_TO.myCollect}/${pageParam.id}/${pageParam.name}`)
          }>
          BACK
        </Button>{" "}
        <Button size="lg" onClick={save}>
          SAVE CHANGES
        </Button>
      </div>
      {item ? (
        <>
          <h3>QUESTION</h3>{" "}
          <div className="oneSide quest">
            <div className={item.imgQ ? "img_choice" : "img_choice img_back"}>
              <input
                type="file"
                id="imgQ"
                value={item.imgQFile ? item.imgQFile : ""}
                onChange={fromFile}
              />
              {item.imgQ && (
                <div className="img">
                  <button
                    variant="outline-secondary"
                    onClick={() =>
                      setItem({ ...item, imgQ: "", imgQFile: "" })
                    }>
                    ❌
                  </button>
                  <img src={getImgQ(item)} alt="" />
                </div>
              )}
            </div>
            <textarea
              className="quest"
              type="text"
              value={item.question}
              onChange={(e) => setItem({ ...item, question: e.target.value })}
            />
          </div>{" "}
          <h3>ANSWER</h3>{" "}
          <div className="oneSide ">
            <div className={item.imgA ? "img_choice" : "img_choice img_back"}>
              <input
                type="file"
                id="imgA"
                value={item.imgAFile ? item.imgAFile : ""}
                onChange={fromFile}
              />
              {item.imgA && (
                <div className="img">
                  {" "}
                  <button
                    onClick={() =>
                      setItem({ ...item, imgA: "", imgAFile: "" })
                    }>
                    ❌
                  </button>
                  <img src={getImgA(item)} alt="" />
                </div>
              )}
            </div>
            <textarea
              className="answ"
              type="text"
              value={item.answer}
              onChange={(e) => setItem({ ...item, answer: e.target.value })}
            />
          </div>
        </>
      ) : (
        <MySpinner />
      )}
    </form>
  );
};

export default EditCard;
