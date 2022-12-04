/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import { useGame } from "../../../hooks/useGame";
import { usePopup } from "../../../hooks/usePopup";
import { shuffle } from "../../../utils/arraysFunc";
import BackBtn from "../../UI/BackBtn/BackBtn";

import MySpinner from "../../UI/MySpinner";
import TestBody from "./TestBody";

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

  return (
    <div>
      <BackBtn variant="dark" size="lg" />
      {/* <Button variant="dark" size="lg" onClick={back}>
        {"❰ Back"}
      </Button> */}

      {isLoading || !items ? (
        <MySpinner />
      ) : (
        <CSSTransition appear={true} in={true} timeout={500} classNames="game">
          <TestBody items={items} />
        </CSSTransition>
      )}
    </div>
  );
};

export default TestCard;
