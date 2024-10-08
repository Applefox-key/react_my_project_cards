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

const WriteCard = () => {
  const [items, setItems] = useState();
  const [key, setKey] = useState(Date.now());
  const [endless, setEndless] = useState(false);
  const setPopup = usePopup();
  const [getContent, isLoading, error] = useGame((arr) => {
    setItems(shuffle(arr));
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
  }, [window.location.pathname, window.location.hash]);

  return (
    <div className="mainField">
      <div className="menuField">
        <BackBtn />{" "}
        <SwitchEndlessBtn endless={endless} setEndless={setEndless} />{" "}
        <SwitchModeBtn modes={["WRITE ANSWER", " WRITE QUESTION"]} />
      </div>
      {!isLoading && items ? (
        endless ? (
          <WriteCardBodyEndless items={items} key={key} />
        ) : (
          <WriteCardBody items={items} setItems={changeItems} key={key} />
        )
      ) : (
        <SpinnerLg className="span_wrap" />
      )}
    </div>
  );
};

export default WriteCard;
