/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useGame } from "../../hooks/useGame";
import { shuffle } from "../../utils/arraysFunc";
import BackBtn from "../UI/BlackBtn/BackBtn";
import WriteCardBody from "./WriteCardBody";
import { usePopup } from "../../hooks/usePopup";
import SpinnerLg from "../UI/SpinnerLg/SpinnerLg";
import SwitchModeBtn from "../UI/BlackBtn/SwitchModeBtn";
import { useParams } from "react-router-dom";

const WriteCard = () => {
  const [items, setItems] = useState();
  const setPopup = usePopup();
  const [getContent, isLoading, error] = useGame(setItems, shuffle);
  const param = useParams().mode;
  useEffect(() => {
    getContent();
    if (error) setPopup.error(error);
  }, []);
  useEffect(() => {
    getContent();
    if (error) setPopup.error(error);
  }, [param]);
  return (
    <div style={{ overflow: "hidden" }}>
      <BackBtn /> <SwitchModeBtn modes={["WRITE ANSWER", " WRITE QUESTION"]} />
      {!isLoading && items ? (
        <WriteCardBody items={items} />
      ) : (
        <SpinnerLg className="span_wrap" />
      )}
    </div>
  );
};

export default WriteCard;
