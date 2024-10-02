import React, { useEffect, useState } from "react";
import { useGame } from "../../../hooks/useGame";
import OneCardG from "../OneCardG";
import { shuffle } from "../../../utils/arraysFunc";
import BackBtn from "../../UI/BlackBtn/BackBtn";
import { CSSTransition } from "react-transition-group";
import { usePopup } from "../../../hooks/usePopup";
import cl from "../../UI/CARDS/MyCard.module.scss";
import SpinnerLg from "../../UI/SpinnerLg/SpinnerLg";
import SwitchModeBtn from "../../UI/BlackBtn/SwitchModeBtn";
import { useParams } from "react-router-dom";
import { TiArrowBackOutline, TiArrowForwardOutline } from "react-icons/ti";
import GameCountBage from "../GameCountBage";
import Rate from "../Rate";
import { addRates, updRates } from "../../../utils/gamesResults";
import GameBtn from "../../UI/BlackBtn/GameBtn";

const CardsGallery = () => {
  const [items, setItems] = useState(null);
  const [direction, setDirection] = useState(true);
  const [itemNum, setItemNum] = useState(0);
  const [anim, setShowAnim] = useState(false);
  const setPopup = usePopup();

  const changeContentAsync = async (initVal) => {
    let res = await addRates(initVal);
    // let res1 = shuffle(res);
    setItems(res);
  };
  const changeContent = async (initVal) => {
    // let res = shuffle(initVal);
    setItems(initVal);
  };
  const shuffleCards = () => {
    let res = shuffle([...items]);
    setItems(res);
  };
  const param = useParams().mode;
  const [getContent, isLoading, error] = useGame(
    useParams().tab === "my" ? changeContentAsync : changeContent,
    useParams().tab === "my"
  );
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
  const leftBtn = {
    onClick: prew,
    name: <TiArrowBackOutline />,
    disabled: itemNum === 0,
    fontstyleb: "fs-arr",
  };
  const rightBtn = () => {
    return {
      onClick: next,
      disabled: itemNum === items.length - 1,
      name: <TiArrowForwardOutline />,
      fontstyleb: "fs-arr",
    };
  };

  return (
    <div className="mainField">
      <div className="menuField d-flex justify-content-between w-100">
        <div>
          <BackBtn />
          <SwitchModeBtn modes={["QUESTION-ANSWER", "ANSWER-QUESTION"]} />
          <GameBtn title="SHUFFLE" onClick={shuffleCards} />
        </div>

        {!!items &&
          !!items[itemNum] &&
          !!items[itemNum].hasOwnProperty("rate") && (
            <Rate
              key={itemNum}
              initialValue={items[itemNum].rate}
              isEditable
              action={(newRate) => updRates(items[itemNum], newRate)}
            />
          )}

        {!isLoading && items && (
          <GameCountBage
            value={items && itemNum + 1 + "/" + items.length}
            bg="warning"
            text="dark"
          />
        )}
      </div>
      {!isLoading && items ? (
        <CSSTransition appear in timeout={1000} classNames="game">
          <div className={cl["card-and-arrow"]}>
            <OneCardG
              clgal={cl.container_gallery_view}
              anim={anim}
              direction={direction}
              twoDir
              item={items[itemNum]}
              leftBtn={leftBtn}
              rightBtn={rightBtn()}
            />
          </div>
        </CSSTransition>
      ) : (
        <SpinnerLg className="span_wrap" />
      )}
    </div>
  );
};

export default CardsGallery;
