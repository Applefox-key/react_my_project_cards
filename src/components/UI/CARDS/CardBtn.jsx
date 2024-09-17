import React from "react";
import { CSSTransition } from "react-transition-group";
import cl from "./MyCard.module.scss";
import { useStretchingText } from "../../../hooks/useStretchingText";
const CardBtn = ({ flipped, btnSide, fontstyleb, name, ...props }) => {
  useStretchingText("cardangle");
  return (
    <>
      <CSSTransition in={flipped} timeout={800} classNames="cardCArrow">
        <button className={cl[btnSide]} {...props}>
          <div className={fontstyleb || "cardangle pe-2"}>{name}</div>
        </button>
      </CSSTransition>
    </>
  );
};

export default CardBtn;
