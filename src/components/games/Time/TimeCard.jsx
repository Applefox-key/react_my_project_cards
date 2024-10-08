/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

import { usePopup } from "../../../hooks/usePopup";
import SpinnerLg from "../../UI/SpinnerLg/SpinnerLg";
import TimeCardBody from "./TimeCardBody";

import { useGame } from "../../../hooks/useGame";
import { shuffle } from "../../../utils/arraysFunc";

const TimeCard = () => {
  const [items, setItems] = useState();
  const setPopup = usePopup();
  const [getContent, isLoading, error] = useGame((arr) => {
    setItems(shuffle(arr));
  });

  useEffect(() => {
    getContent();
    if (error) setPopup.error(error);
  }, []);

  return (
    <div className="mainField">
      {!isLoading && items ? (
        <CSSTransition appear in timeout={500} classNames="game">
          <TimeCardBody items={items} />
        </CSSTransition>
      ) : (
        <SpinnerLg className="span_wrap" />
      )}
    </div>
  );
};

export default TimeCard;
