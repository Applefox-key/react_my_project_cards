import React from "react";
import cl from "./MyCard.module.css";
import "./MyCard.module.css";
import { CSSTransition } from "react-transition-group";

import "animate.css";
import { useNavigate } from "react-router-dom";

const Result = ({ text }) => {
  const router = useNavigate();
  const back = () => {
    router(-1);
  };
  return (
    <CSSTransition appear={true} in={true} timeout={500} classNames="result">
      <div className={cl.container_gallery}>
        <div className={cl["card-container"]}>
          <button className={cl["card-button"]} onClick={back}>
            <div className={cl["card-front"]}>
              <h1 className="display-1">{text}</h1>
            </div>
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Result;
