import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useGame } from "../../hooks/useGame";
import { usePopup } from "../../hooks/usePopup";
import BackBtn from "../UI/BlackBtn/BackBtn";
import PartBody from "./PartBody";
import SpinnerLg from "../UI/SpinnerLg/SpinnerLg";
import { useParams } from "react-router-dom";
import SwitchModeBtn from "../UI/BlackBtn/SwitchModeBtn";
import { formatContentParts } from "../../utils/games";

const PartCard = () => {
  const setPopup = usePopup();
  const [items, setItems] = useState();
  const mode = useParams().mode;
  const contentParts = (arr) => {
    return formatContentParts(arr, parseInt(mode));
  };

  const [getContent, isLoading, error] = useGame(setItems, contentParts);

  useEffect(() => {
    getContent();
    if (error) setPopup.error(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getContent();
    if (error) setPopup.error(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);
  return (
    <div>
      <BackBtn />
      <SwitchModeBtn modes={["QUESTIONS PARTS", "ANSWERS PARTS"]} />

      {isLoading || !items ? (
        <SpinnerLg className="span_wrap" />
      ) : (
        <CSSTransition appear={true} in={true} timeout={500} classNames="game">
          <PartBody items={items} />
        </CSSTransition>
      )}
    </div>
  );
};

export default PartCard;
