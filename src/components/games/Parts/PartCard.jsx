import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useParams } from "react-router-dom";

import PartBodyEndless from "./PartBodyEndless";
import SwitchEndlessBtn from "../../UI/BlackBtn/SwitchEndlessBtn";
import SwitchModeBtn from "../../UI/BlackBtn/SwitchModeBtn";
import BackBtn from "../../UI/BlackBtn/BackBtn";
import PartBody from "./PartBody";
import SpinnerLg from "../../UI/SpinnerLg/SpinnerLg";

import { useGame } from "../../../hooks/useGame";
import { usePopup } from "../../../hooks/usePopup";
import { saveResults } from "../../../utils/gamesResults";
import { formatContentParts } from "../../../utils/games";
import SwitchRate from "../../UI/BlackBtn/SwitchRate";
import Result from "../../UI/CARDS/Result";

const PartCard = () => {
  const setPopup = usePopup();
  const [items, setItems] = useState();
  const [endless, setEndless] = useState(false);
  const [key, setKey] = useState(Date.now());
  const [filterRate, setFilterRate] = useState(null);
  const mode = useParams().mode;
  const contentParts = (arr) => {
    let res = formatContentParts(
      filterRate ? arr.filter((el) => filterRate.includes(el.rate + 1)) : arr,
      parseInt(mode)
    );
    setItems(res);
  };
  const [getContent, isLoading, error] = useGame(contentParts);
  const changeItems = (newVal) => {
    setItems([...newVal]);
    setKey(Date.now());
  };
  useEffect(() => {
    if (!endless) return;
    return () => {
      saveResults("parts");
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endless]);
  useEffect(
    () => {
      if (!endless) return;
      saveResults("parts");
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode]
  );
  useEffect(() => {
    getContent();
    if (error) setPopup.error(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname, window.location.hash, filterRate]);

  return (
    <div className="mainField">
      <div className="gameTitle">Puzzle game</div>
      <div className="menuField">
        <BackBtn />
        {!!items?.length && (
          <>
            <SwitchEndlessBtn endless={endless} setEndless={setEndless} />
            <SwitchModeBtn modes={["QUESTIONS PARTS", "ANSWERS PARTS"]} />
          </>
        )}
        <SwitchRate {...{ filterRate, setFilterRate }} />
      </div>
      {isLoading || !items ? (
        <SpinnerLg className="span_wrap" />
      ) : (
        <CSSTransition appear in timeout={500} classNames="game">
          {!items?.length ? (
            <Result
              text="Oops! No cards match the selected options"
              noAgainBtn
            />
          ) : endless ? (
            <PartBodyEndless items={items} key={key} />
          ) : (
            <PartBody items={items} setItems={changeItems} key={key} />
          )}
        </CSSTransition>
      )}
    </div>
  );
};

export default PartCard;
