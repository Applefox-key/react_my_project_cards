/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useGame } from "../../../hooks/useGame";
import MySpinner from "../../UI/MySpinner";
import { shuffle } from "../../../utils/arraysFunc";
import BackBtn from "../../UI/BackBtn/BackBtn";
import TimeCardBody from "./TimeCardBody";
import { CSSTransition } from "react-transition-group";
import { usePopup } from "../../../hooks/usePopup";

const TimeCard = () => {
  const [items, setItems] = useState();
  const setPopup = usePopup();
  const [getContent, isLoading, error] = useGame(setItems, shuffle);

  useEffect(() => {
    getContent();
    if (error) setPopup.error(error);
  }, []);

  return (
    <div style={{ overflow: "hidden" }}>
      <BackBtn size="lg" />
      {!isLoading && items ? (
        <CSSTransition appear={true} in={true} timeout={500} classNames="game">
          <TimeCardBody items={items} />
        </CSSTransition>
      ) : (
        <MySpinner />
      )}
    </div>
  );
};

export default TimeCard;
