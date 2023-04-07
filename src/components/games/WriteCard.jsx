/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useGame } from "../../hooks/useGame";
import MySpinner from "../UI/MySpinner";
import { shuffle } from "../../utils/arraysFunc";
import BackBtn from "../UI/BackBtn/BackBtn";
import WriteCardBody from "./WriteCardBody";
import { usePopup } from "../../hooks/usePopup";

const WriteCard = () => {
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
      {!isLoading && items ? <WriteCardBody items={items} /> : <MySpinner />}
    </div>
  );
};

export default WriteCard;
