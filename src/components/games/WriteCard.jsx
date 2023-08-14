/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useGame } from "../../hooks/useGame";
import { shuffle } from "../../utils/arraysFunc";
import BackBtn from "../UI/BlackBtn/BackBtn";
import WriteCardBody from "./WriteCardBody";
import { usePopup } from "../../hooks/usePopup";
import SpinnerLg from "../UI/SpinnerLg/SpinnerLg";
import WriteCardBodyEndless from "./WriteCardBodyEndless";
import SwitchEndlessBtn from "../UI/BlackBtn/SwitchEndlessBtn";

const WriteCard = () => {
  const [items, setItems] = useState();
  const [key, setKey] = useState(Date.now());
  const [endless, setEndless] = useState(false);
  const setPopup = usePopup();
  const [getContent, isLoading, error] = useGame(setItems, shuffle);
  const changeItems = (newVal) => {
    setItems([...newVal]);
    setKey(Date.now());
  };

  useEffect(() => {
    getContent();
    if (error) setPopup.error(error);
  }, []);

  useEffect(() => {
    getContent();
    if (error) setPopup.error(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname, window.location.hash]);

  return (
    <div style={{ overflow: "hidden" }}>
      <BackBtn /> <SwitchEndlessBtn endless={endless} setEndless={setEndless} />
      {!isLoading && items ? (
        endless ? (
          <WriteCardBodyEndless
            items={items}
            setItems={changeItems}
            key={key}
          />
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
