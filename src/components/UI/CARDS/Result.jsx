import React from "react";
import cl from "./MyCard.module.scss";
import "./MyCard.module.scss";
import { CSSTransition } from "react-transition-group";

import "animate.css";
import { useNavigate } from "react-router-dom";
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
    <CSSTransition appear={true} in={true} timeout={500} classNames="result">
      <div className={[cl.container_gallery, count ? "mt-5" : ""].join(" ")}>
        <div id="gameresult" className={cl["card-container"]}>
          <button className={cl["card-button"]} onClick={back}>
            <div className={[cl["card-front"], cl["card-result"]].join(" ")}>
              <div>
                <h1 className="display-1">{text}</h1>
                {count && <GameCount count={count} result={true} />}
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
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Result;
