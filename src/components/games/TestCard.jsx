/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useGame } from "../../hooks/useGame";
import { usePopup } from "../../hooks/usePopup";
import { shuffle } from "../../utils/arraysFunc";
import BackBtn from "../UI/BlackBtn/BackBtn";
import TestBody from "./TestBody";
import SpinnerLg from "../UI/SpinnerLg/SpinnerLg";
import SwitchModeBtn from "../UI/BlackBtn/SwitchModeBtn";

const TestCard = () => {
  const setPopup = usePopup();
  const [items, setItems] = useState();

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
    return res;
  };

  const [getContent, isLoading, error] = useGame(setItems, contentParts);
  useEffect(() => {
    getContent();
    if (error) setPopup.error(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getContent();
    if (error) setPopup.error(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);
  return (
    <div>
      <BackBtn />
      <SwitchModeBtn modes={["FIND ANSWER", " FIND QUESTION"]} />
      {isLoading || !items ? (
        <SpinnerLg className="span_wrap" />
      ) : (
        <CSSTransition appear={true} in={true} timeout={500} classNames="game">
          <TestBody items={items} />
        </CSSTransition>
      )}
    </div>
  );
};

export default TestCard;
