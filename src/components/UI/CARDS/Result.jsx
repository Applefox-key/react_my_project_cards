import React from "react";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";

import cl from "./MyCard.module.scss";
import "./MyCard.module.scss";
import "animate.css";

import GameCount from "../../games/GameCount";

const Result = ({ text, count, mist }) => {
  const router = useNavigate();
  const back = () => {
    router(-1);
  };
  const againFn = function (e) {
    e.stopPropagation();
    router(window.location.pathname + "#" + Date.now(), { replace: true });
  };
  const againMist = function (e) {
    e.stopPropagation();
    mist();
  };
  return (
    <CSSTransition appear in timeout={500} classNames="result">
      <div
        className={[
          cl.container_gallery_result,
          count ? "mt-5" : "m-auto",
        ].join(" ")}>
        <div id="gameresult" className={cl["card-container"]}>
          <div className={cl["card-button"]} onClick={back}>
            <div className={[cl["card-front"], cl["card-result"]].join(" ")}>
              <div>
                <h1 className="display-1">{text}</h1>
                {count && <GameCount count={count} result />}
                <div>
                  <h1 className={cl["result-again"]} onClick={againFn}>
                    Play again
                  </h1>
                  {mist && (
                    <h1 className={cl["result-againer"]} onClick={againMist}>
                      Play again with errors
                    </h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Result;
