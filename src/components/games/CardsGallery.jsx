import React, { useEffect, useState } from "react";
import { useGame } from "../../hooks/useGame";
import OneCardG from "./OneCardG";
import { shuffle } from "../../utils/arraysFunc";
import BackBtn from "../UI/BlackBtn/BackBtn";
import { CSSTransition } from "react-transition-group";
import { usePopup } from "../../hooks/usePopup";
import cl from "../UI/CARDS/MyCard.module.scss";
import SpinnerLg from "../UI/SpinnerLg/SpinnerLg";
import SwitchModeBtn from "../UI/BlackBtn/SwitchModeBtn";
import { useParams } from "react-router-dom";

const CardsGallery = () => {
  const [items, setItems] = useState();
  const [direction, setDirection] = useState(true);
  const [itemNum, setItemNum] = useState(0);
  const [anim, setShowAnim] = useState(false);
  const setPopup = usePopup();
  const [getContent, isLoading, error] = useGame(setItems, shuffle);
  const param = useParams().mode;
  useEffect(() => {
    getContent();
    if (error) setPopup.error(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getContent();
    if (error) setPopup.error(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  const next = () => {
    if (!direction) setDirection(true);
    setShowAnim(!anim);
    setItemNum(Math.min(itemNum + 1, items.length - 1));
  };

  const prew = () => {
    if (direction) setDirection(false);
    setShowAnim(!anim);
    setItemNum(Math.max(itemNum - 1, 0));
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <BackBtn />
      <SwitchModeBtn modes={["QUESTION-ANSWER", "ANSWER-QUESTION"]} />
      {!isLoading && items ? (
        <CSSTransition appear={true} in={true} timeout={500} classNames="game">
          <div>
            <p className="contrastColor">
              {items && itemNum + 1 + "/" + items.length}
            </p>

            <div className={cl["card-and-arrow"]}>
              <button
                type="button"
                className={cl.collect_button}
                disabled={itemNum === 0}
                onClick={prew}>
                <span className={cl.collect_button_text}>❰</span>
              </button>
              <div className="d-flex   justify-content-end">
                <OneCardG
                  anim={anim}
                  direction={direction}
                  item={items[itemNum]}
                />
              </div>
              <button
                type="button"
                className={cl.collect_button}
                disabled={items.length - 1 === itemNum}
                onClick={next}>
                <span className={cl.collect_button_text}>❱</span>
              </button>
            </div>
          </div>
        </CSSTransition>
      ) : (
        <SpinnerLg className="span_wrap" />
      )}
    </div>
  );
};

export default CardsGallery;
