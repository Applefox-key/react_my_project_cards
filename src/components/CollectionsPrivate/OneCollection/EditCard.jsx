import React, { useEffect, useState } from "react";
import "../../../styles/oneCollection.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "../../../hooks/useQuery";
import BaseAPI from "../../../API/BaseAPI";
import Button from "react-bootstrap/Button";
import { usePopup } from "../../../hooks/usePopup";
import SpinnerLg from "../../UI/SpinnerLg/SpinnerLg";
import BackBtn from "../../UI/BlackBtn/BackBtn";
import { addRates, updRates } from "../../../utils/gamesResults";
import Rate from "../../games/Rate";
import EditCardPart from "./EditCardPart";
import VoiceBtns from "../../UI/VoiceBtns";

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
    const rate = await addRates([content]);
    setItem({ ...rate[0], note: content.note === null ? "" : content.note });
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
      // route(`/collections/my/${pageParam.id}/${pageParam.name}`, {
      //   replace: true,
      // });
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
            {isItem && (
              <Rate
                initialValue={item.rate}
                isEditable
                action={(newRate) => updRates(item, newRate)}
              />
            )}

            <div className="menuRow">
              {!!textRef && (
                <div dataTitle={textRef.current.id} className="voiceEdit">
                  <VoiceBtns textRef={textRef} />
                </div>
              )}
              <Button size="lg" onClick={save} variant="light">
                SAVE CHANGES
              </Button>{" "}
              <BackBtn variant="light" />
            </div>
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

          <div className="note">
            <input
              type="text"
              placeholder="write a note..."
              value={item ? item.note : ""}
              onChange={(e) => setItem({ ...item, note: e.target.value })}
            />
          </div>
        </div>
      ) : (
        <SpinnerLg className="span_wrap" />
      )}
    </div>
  );
};

export default EditCard;
