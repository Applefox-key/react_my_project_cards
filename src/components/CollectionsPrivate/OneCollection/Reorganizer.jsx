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
    console.log("jjj");

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
          <h3 className="spanCount">{selectedCards.length}</h3>
          <p>
            <span>1</span> Choose cards to transfer
          </p>
          <div>
            {selectedCards.length === content.length ? (
              <MdOutlineCheckBox onClick={() => check(0)} title="check all" />
            ) : (
              <MdOutlineCheckBoxOutlineBlank
                onClick={() => check(1)}
                title="uncheck all"
              />
            )}
          </div>
        </div>
        {!isLoading && !!collectList && (
          <div className="organiser-box ">
            <p>
              <span>2</span> Choose collection to transfer cards
            </p>
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
        <div className="organiser-box-btn">
          <p>
            <span>3</span> LAST STEP
          </p>

          <Button size="lg" variant="light" onClick={transfer} className="me-2">
            Transfer
          </Button>
        </div>{" "}
        <div className="organiser-box-title">
          <h4 className="me-1">REORGANIZATION MODE</h4> you can transfer some
          cards to another collection{" "}
          <Button size="lg" variant="light" onClick={() => setReorgMode(false)}>
            Cansel
          </Button>
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
