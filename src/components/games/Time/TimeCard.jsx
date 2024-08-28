/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useGame } from "../../../hooks/useGame";
import { shuffle } from "../../../utils/arraysFunc";
import TimeCardBody from "./TimeCardBody";
import { CSSTransition } from "react-transition-group";
import { usePopup } from "../../../hooks/usePopup";
import SpinnerLg from "../../UI/SpinnerLg/SpinnerLg";

const TimeCard = () => {
  const [items, setItems] = useState();
  const setPopup = usePopup();
  const [getContent, isLoading, error] = useGame(setItems, shuffle);

  useEffect(() => {
    getContent();
    if (error) setPopup.error(error);
  }, []);

  return (
    <div className="mainField">
      {!isLoading && items ? (
        <CSSTransition appear={true} in={true} timeout={500} classNames="game">
          <TimeCardBody items={items} />
        </CSSTransition>
      ) : (
        <SpinnerLg className="span_wrap" />
      )}
    </div>
  );
};

export default TimeCard;
