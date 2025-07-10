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
  const [filterRate, setFilterRate] = useState(null);
  const setPopup = usePopup();
  const [getContent, isLoading, error] = useGame((arr) => {
    setItems(
      shuffle(
        filterRate ? arr.filter((el) => filterRate.includes(el.rate + 1)) : arr
      )
    );
  });

  useEffect(() => {
    getContent();
    if (error) setPopup.error(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname, window.location.hash, filterRate]);
  return (
    <div className="mainField">
      {!isLoading && items ? (
        <CSSTransition appear in timeout={500} classNames="game">
          <TimeCardBody {...{ items, filterRate, setFilterRate }} />
        </CSSTransition>
      ) : (
        <SpinnerLg className="span_wrap" />
      )}
    </div>
  );
};

export default TimeCard;
