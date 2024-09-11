import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useGame } from "../../../hooks/useGame";
import { usePopup } from "../../../hooks/usePopup";
import BackBtn from "../../UI/BlackBtn/BackBtn";
import PartBody from "./PartBody";
import SpinnerLg from "../../UI/SpinnerLg/SpinnerLg";
import { useParams } from "react-router-dom";
import { formatContentParts } from "../../../utils/games";
import PartBodyEndless from "./PartBodyEndless";
import SwitchEndlessBtn from "../../UI/BlackBtn/SwitchEndlessBtn";
import SwitchModeBtn from "../../UI/BlackBtn/SwitchModeBtn";
import { saveResults } from "../../../utils/gamesResults";

const PartCard = () => {
  const setPopup = usePopup();
  const [items, setItems] = useState();
  const [endless, setEndless] = useState(false);
  const [key, setKey] = useState(Date.now());
  const mode = useParams().mode;
  const contentParts = (arr) => {
    let res = formatContentParts(arr, parseInt(mode));
    setItems(res);
  };
  const [getContent, isLoading, error] = useGame(contentParts);
  const changeItems = (newVal) => {
    setItems([...newVal]);
    setKey(Date.now());
  };
  useEffect(() => {
    if (!endless) return;
    return () => {
      saveResults("parts");
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endless]);
  useEffect(
    () => {
      if (!endless) return;
      saveResults("parts");
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode]
  );
  useEffect(() => {
    getContent();
    if (error) setPopup.error(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname, window.location.hash]);

  return (
    <div className="mainField">
      <div className="menuField">
        <BackBtn />
        <SwitchEndlessBtn endless={endless} setEndless={setEndless} />{" "}
        <SwitchModeBtn modes={["QUESTIONS PARTS", "ANSWERS PARTS"]} />
      </div>
      {isLoading || !items ? (
        <SpinnerLg className="span_wrap" />
      ) : (
        <CSSTransition
          appear={true}
          in={"true"}
          timeout={500}
          classNames="game">
          {endless ? (
            <PartBodyEndless items={items} key={key} />
          ) : (
            <PartBody items={items} setItems={changeItems} key={key} />
          )}
        </CSSTransition>
      )}
    </div>
  );
};

export default PartCard;
