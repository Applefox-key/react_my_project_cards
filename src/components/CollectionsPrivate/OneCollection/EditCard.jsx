import React, { useEffect, useState } from "react";
import "../../../styles/oneCollection.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "../../../hooks/useQuery";
import BaseAPI from "../../../API/BaseAPI";
import Button from "react-bootstrap/Button";
import { getImgA, getImgQ } from "../../../utils/contentRequests";
import { usePopup } from "../../../hooks/usePopup";
import SpinnerLg from "../../UI/SpinnerLg/SpinnerLg";
import BackBtn from "../../UI/BlackBtn/BackBtn";
import { SlPicture } from "react-icons/sl";
const EditCard = () => {
  const [item, setItem] = useState();
  const pageParam = useParams();
  const setPopup = usePopup();
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
      route(`/collections/my/${pageParam.id}/${pageParam.name}`, {
        replace: true,
      });
    } catch (error) {
      setPopup.error(error.message);
    }
  };

  useEffect(() => {
    getContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParam.id, pageParam.name, pageParam.item]);

  return (
    <form className="big_card_wrap">
      <div className="menuRow">
        <BackBtn variant="light" />
        <Button size="lg" onClick={save} variant="light">
          SAVE CHANGES
        </Button>
      </div>
      <div className="note">
        <h3>NOTE:</h3>{" "}
        <input
          type="text"
          placeholder="write a note..."
          value={item ? item.note : ""}
          onChange={(e) => setItem({ ...item, note: e.target.value })}
        />
      </div>
      {item ? (
        <div className="editCard">
          <div className="questDiv">
            <h3>QUESTION</h3>{" "}
            <div className="oneSide quest">
              <div className="img_choice">
                <input
                  type="file"
                  id="imgQ"
                  value={item.imgQFile ? item.imgQFile : ""}
                  onChange={fromFile}
                />
                {item.imgQ ? (
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
                ) : (
                  <SlPicture className="img" />
                )}
              </div>
              <textarea
                className="quest"
                type="text"
                placeholder="write a question....."
                value={item.question}
                onChange={(e) => setItem({ ...item, question: e.target.value })}
              />
            </div>
          </div>
          <div className="answtDiv">
            <h3>ANSWER</h3>
            <div className="oneSide ">
              <div className="img_choice">
                <input
                  type="file"
                  id="imgA"
                  value={item.imgAFile ? item.imgAFile : ""}
                  onChange={fromFile}
                />
                {item.imgA ? (
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
                ) : (
                  <SlPicture className="img" />
                )}
              </div>
              <textarea
                className="answ"
                type="text"
                placeholder="write an answer..."
                value={item.answer}
                onChange={(e) => setItem({ ...item, answer: e.target.value })}
              />
            </div>
          </div>
        </div>
      ) : (
        <SpinnerLg className="span_wrap" />
      )}
    </form>
  );
};

export default EditCard;
