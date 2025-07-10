/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BackBtn from "../../UI/BlackBtn/BackBtn";
import WriteCardBody from "./WriteCardBody";
import WriteCardBodyEndless from "./WriteCardBodyEndless";
import SwitchEndlessBtn from "../../UI/BlackBtn/SwitchEndlessBtn";
import SwitchModeBtn from "../../UI/BlackBtn/SwitchModeBtn";
import SpinnerLg from "../../UI/SpinnerLg/SpinnerLg";

import { useGame } from "../../../hooks/useGame";
import { usePopup } from "../../../hooks/usePopup";
import { shuffle } from "../../../utils/arraysFunc";
import { saveResults } from "../../../utils/gamesResults";
import SwitchRate from "../../UI/BlackBtn/SwitchRate";
import Result from "../../UI/CARDS/Result";

const WriteCard = () => {
  const [items, setItems] = useState();
  const [isResult, setIsResult] = useState(false);
  const [key, setKey] = useState(Date.now());
  const [endless, setEndless] = useState(false);
  const [filterRate, setFilterRate] = useState(null);
  const setPopup = usePopup();

  const [getContent, isLoading, error] = useGame((arr) => {
    setItems(
      shuffle(
        filterRate ? arr.filter((el) => filterRate.includes(el.rate + 1)) : arr
      )
    );
  });
  const mode = useParams().mode;
  const changeItems = (newVal) => {
    setItems([...newVal]);
    setKey(Date.now());
  };

  useEffect(() => {
    if (!endless) return;
    return () => {
      saveResults("write");
      // eslint-disable-next-line react-hooks/exhaustive-deps
    };
  }, [endless]);

  useEffect(() => {
    if (!endless) return;
    saveResults("write");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => {
    getContent();
    if (error) setPopup.error(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname, window.location.hash, filterRate]);

  return (
    <div className="mainField">
      <div className="gameTitle">Write an answer</div>
      <div className="menuField">
        <BackBtn />
        {!!items?.length && !isResult && items && (
          <>
            <SwitchEndlessBtn endless={endless} setEndless={setEndless} />
            <SwitchModeBtn
              modes={["WRITE ANSWER", " WRITE QUESTION"]}
              isShowMenuBtn
            />
          </>
        )}
        <SwitchRate {...{ filterRate, setFilterRate }} />
      </div>
      {!isLoading && items && items.length ? (
        endless ? (
          <WriteCardBodyEndless items={items} key={key} />
        ) : (
          <WriteCardBody
            {...{ items, key, isResult, setIsResult, setItems: changeItems }}
          />
        )
      ) : !isLoading ? (
        <Result text="Oops! No cards match the selected options" noAgainBtn />
      ) : (
        <SpinnerLg className="span_wrap" />
      )}
    </div>
  );
};

export default WriteCard;
