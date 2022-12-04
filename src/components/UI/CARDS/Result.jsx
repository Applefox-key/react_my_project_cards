import React from "react";
import cl from "./MyCard.module.css";
import "./MyCard.module.css";
import { CSSTransition } from "react-transition-group";

import "animate.css";
const Result = ({ text }) => {
  return (
    <CSSTransition appear={true} in={true} timeout={500} classNames="result">
      <div className={cl["card-container"]}>
        <button className={cl["card-button"]}>
          <div className={cl["card-front"]}>
            <h1 className="display-1">{text}</h1>
          </div>
        </button>
      </div>
    </CSSTransition>
  );
};

export default Result;
