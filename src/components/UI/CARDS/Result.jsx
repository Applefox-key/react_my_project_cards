import React from "react";
import cl from "./MyCard.module.scss";
import "./MyCard.module.scss";
import { CSSTransition } from "react-transition-group";

import "animate.css";
import { useNavigate } from "react-router-dom";
import GameCount from "../../games/GameCount";

const Result = ({ text, count }) => {
  const router = useNavigate();
  const back = () => {
    router(-1);
  };
  return (
    <CSSTransition appear={true} in={true} timeout={500} classNames="result">
      <div className={[cl.container_gallery, count ? "mt-5" : ""].join(" ")}>
        <div className={cl["card-container"]}>
          <button className={cl["card-button"]} onClick={back}>
            <div className={cl["card-front"]}>
              <div className="">
                <h1 className="display-1">{text}</h1>
                {count && <GameCount count={count} result={true} />}
              </div>
            </div>
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Result;
