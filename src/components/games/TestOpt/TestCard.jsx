/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useParams } from "react-router-dom";

import BackBtn from "../../UI/BlackBtn/BackBtn";
import SpinnerLg from "../../UI/SpinnerLg/SpinnerLg";
import SwitchEndlessBtn from "../../UI/BlackBtn/SwitchEndlessBtn";
import TestBodyEndless from "./TestBodyEndless";
import SwitchModeBtn from "../../UI/BlackBtn/SwitchModeBtn";
import TestBody from "./TestBody";

import { useGame } from "../../../hooks/useGame";
import { usePopup } from "../../../hooks/usePopup";
import { shuffle } from "../../../utils/arraysFunc";
import { saveResults } from "../../../utils/gamesResults";

const TestCard = () => {
  const setPopup = usePopup();
  const [items, setItems] = useState();
  const [endless, setEndless] = useState(false);
  const [key, setKey] = useState(Date.now());
  const mode = useParams().mode;
  const contentParts = (arr) => {
    shuffle(arr);
    let res = arr.map((el, i) => {
      let a = [...arr];
      a.splice(i, 1);
      let answ = shuffle(a).slice(0, 3);
      answ.push(el);
      shuffle(answ);
      return { item: el, answ: answ };
    });
    setItems(res);
  };

  const changeItems = (newVal) => {
    setItems([...newVal]);
    setKey(Date.now());
  };
  const [getContent, isLoading, error] = useGame(contentParts);

  useEffect(() => {
    if (!endless) return;
    return () => {
      saveResults("test");
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endless]);

  useEffect(
    () => {
      if (!endless) return;
      saveResults("test");
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode]
  );

  useEffect(() => {
    getContent();
    setKey(Date.now());
    if (error) setPopup.error(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname, window.location.hash]);

  return (
    <div className="mainField">
      <div className="menuField">
        <BackBtn />{" "}
        <SwitchEndlessBtn endless={endless} setEndless={setEndless} />
        <SwitchModeBtn modes={["QUESTIONS PARTS", "ANSWERS PARTS"]} />
      </div>
      {isLoading || !items ? (
        <SpinnerLg className="span_wrap" />
      ) : (
        <CSSTransition appear in timeout={500} classNames="game">
          {endless ? (
            <TestBodyEndless items={items} key={key} />
          ) : (
            <TestBody items={items} setItems={changeItems} key={key} />
          )}
        </CSSTransition>
      )}
    </div>
  );
};

export default TestCard;
