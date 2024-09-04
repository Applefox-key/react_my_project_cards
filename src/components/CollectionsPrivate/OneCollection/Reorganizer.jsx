import React, { useEffect, useState } from "react";
import BaseAPI from "../../../API/BaseAPI";
import { useQuery } from "../../../hooks/useQuery";
import { Button, Form } from "react-bootstrap";
import { onePartLittle } from "../../../utils/cardFragment";
import { transferContent } from "../../../utils/editCollectionHlp";
import { usePopup } from "../../../hooks/usePopup";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";

const Reorganizer = ({ setReorgMode, content, setContent }) => {
  const [collectList, setCollectList] = useState(null);
  const [selected, setSelected] = useState(null);
  const [selectedCards, setSelectedCards] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [getContent, isLoading, error] = useQuery(async () => {
    const resultColl = await BaseAPI.getCollectionsList();

    setCollectList(resultColl);
  });
  const popup = usePopup();
  useEffect(() => {
    getContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const transfer = async () => {
    let res = await transferContent(selectedCards, selected);
    if (res && !res.error) {
      const newCont = content.filter((el) => !selectedCards.includes(el.id));
      popup.success(res.message ? res.message : "success");
      setContent(newCont);
      setReorgMode(false);
    } else {
      let err = res && res.error ? res.error : "something goes wrong";
      popup.error({ err });
    }
  };
  const handleClickCard = (card) => {
    let newVal;
    if (selectedCards.includes(card.id))
      newVal = selectedCards.filter((el) => el !== card.id);
    else newVal = [...selectedCards, card.id];
    setSelectedCards(newVal);
  };

  const check = (ischecked) => {
    if (ischecked) {
      const val = content.map((el) => el.id);
      setSelectedCards(val);
    } else {
      setSelectedCards([]);
    }
  };

  return (
    <>
      <div className="string_menu organiser-wrap">
        <div className="organiser-box">
          REORGANIZATION MODE
          <div>you can transfer some cards to another collection</div>
        </div>
        <div className="organiser-box">
          1. Choose cards to transfer
          <span>{selectedCards.length}</span>
          <div>
            <MdOutlineCheckBox onClick={() => check(1)} />
            <MdOutlineCheckBoxOutlineBlank onClick={() => check(0)} />
          </div>
        </div>
        {!isLoading && !!collectList && (
          <div className="organiser-box ">
            2. Choose collection to transfer cards
            <Form.Select
              onChange={(e) => setSelected(e.target.value)}
              value={!selected ? -1 : selected.id}
              aria-label="collection select"
              className="colldropdown m-auto">
              <option className={"firstSelect"} value={null}>
                ADD NEW
              </option>
              {collectList.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              ))}
            </Form.Select>
          </div>
        )}
        <div className="organiser-box ">
          3. LAST STEP
          <div>
            <Button
              size="lg"
              variant="light"
              onClick={transfer}
              className="me-2">
              Transfer
            </Button>
            <Button
              size="lg"
              variant="light"
              onClick={() => setReorgMode(false)}>
              Cansel
            </Button>
          </div>
        </div>
      </div>{" "}
      REORGANIZATION MODE
      <div className="listContent-wrap">
        {content && (
          <div className="listContent organizer">
            {content.map((el, i) => (
              <div
                key={el.id}
                className={
                  selectedCards.includes(el.id)
                    ? "one-row-organizer-active"
                    : "one-row-organizer"
                }
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickCard(el);
                }}>
                {onePartLittle(el, "question")}
                {onePartLittle(el, "answer")}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Reorganizer;
