/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useGame } from "../../hooks/useGame";
import { usePopup } from "../../hooks/usePopup";
import { shuffle } from "../../utils/arraysFunc";
import BackBtn from "../UI/BlackBtn/BackBtn";
import TestBody from "./TestBody";
import SpinnerLg from "../UI/SpinnerLg/SpinnerLg";
import SwitchEndlessBtn from "../UI/BlackBtn/SwitchEndlessBtn";
import TestBodyEndless from "./TestBodyEndless";
import SwitchModeBtn from "../UI/BlackBtn/SwitchModeBtn";

const TestCard = () => {
  const setPopup = usePopup();
  const [items, setItems] = useState();
  const [endless, setEndless] = useState(false);
  const [key, setKey] = useState(Date.now());

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
  const changeItems = (newVal) => {
    setItems([...newVal]);
    setKey(Date.now());
  };
  const [getContent, isLoading, error] = useGame(setItems, contentParts);
  // useEffect(() => {
  //   getContent();
  //   if (error) setPopup.error(error);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  useEffect(() => {
    getContent();
    setKey(Date.now());
    if (error) setPopup.error(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname, window.location.hash]);
  return (
    <div>
      <BackBtn /> <SwitchEndlessBtn endless={endless} setEndless={setEndless} />
      <SwitchModeBtn modes={["QUESTIONS PARTS", "ANSWERS PARTS"]} />
      {isLoading || !items ? (
        <SpinnerLg className="span_wrap" />
      ) : (
        <CSSTransition appear={true} in={true} timeout={500} classNames="game">
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
