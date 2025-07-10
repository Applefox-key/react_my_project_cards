import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "react-bootstrap/Button";

import "../../../styles/oneCollection.scss";

import Rate from "../../games/Rate";
import EditCardPart from "./EditCardPart";
import VoiceInputBtns from "../../UI/VoiceBtns/VoiceInputBtns";
import SpinnerLg from "../../UI/SpinnerLg/SpinnerLg";
import BackBtn from "../../UI/BlackBtn/BackBtn";

import { useQuery } from "../../../hooks/useQuery";
import { usePopup } from "../../../hooks/usePopup";

import { updRates } from "../../../utils/gamesResults";
import BaseAPI from "../../../API/BaseAPI";

const EditCard = () => {
  const [item, setItem] = useState();
  let isItem = !!item && !!item.hasOwnProperty("rate");
  const [textRef, setTextRef] = useState(null);
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
    if (pageParam.item === "new") {
      setItem(content);
      return;
    }
    // const rate = await addRates([content]);

    setItem({ ...content, note: content.note === null ? "" : content.note });
    // setItem({ ...rate[0], note: content.note === null ? "" : content.note });
  });

  const route = useNavigate();

  const setNewRef = (ref) => {
    if (textRef) {
      const field = textRef.current.id;
      const val = textRef.current.value;
      setItem({ ...item, [field]: val });
    }
    setTextRef(ref);
  };

  const updateRate = (newRate) => {
    updRates(item, newRate);
    setItem({ ...item, rate: newRate });
  };
  const save = async () => {
    if (!item) return;
    const saveItem = { ...item };
    //save voice value
    if (textRef) {
      const field = textRef.current.id;
      const val = textRef.current.value;
      saveItem[field] = val;
    }
    try {
      if (saveItem.id === "new")
        await BaseAPI.createContent(saveItem, pageParam.id);
      else await BaseAPI.editContent(saveItem);
      route(-1);
    } catch (error) {
      setPopup.error(error.message);
    }
  };

  useEffect(() => {
    getContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParam.id, pageParam.name, pageParam.item]);

  return (
    <div className="edit_card_wrap">
      {item ? (
        <div className="editCard">
          <div className={`menuRow menu-border ${isItem ? "" : "flex-end"}`}>
            {isItem && <Rate initialValue={item.rate} action={updateRate} />}
            <div className="menuRow">
              <Button size="lg" onClick={save} variant="light">
                SAVE CHANGES
              </Button>{" "}
              <BackBtn variant="light" />
            </div>
          </div>
          {!!textRef && (
            <VoiceInputBtns textRef={textRef} className="voiceEdit" />
          )}
          <div className="note">
            <input
              type="text"
              placeholder="write a note..."
              value={item ? item.note : ""}
              onChange={(e) => setItem({ ...item, note: e.target.value })}
            />
          </div>
          <EditCardPart
            fieldName={"imgQ"}
            item={item}
            setItem={setItem}
            setTextRef={setNewRef}
          />
          <EditCardPart
            fieldName={"imgA"}
            item={item}
            setItem={setItem}
            setTextRef={setNewRef}
          />
        </div>
      ) : (
        <SpinnerLg className="span_wrap" />
      )}
    </div>
  );
};

export default EditCard;
