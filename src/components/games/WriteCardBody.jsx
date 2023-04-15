/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";

import OneCardG from "./OneCardG";
import cl from "./Games.module.scss";
import GameCount from "./GameCount";
import { onlyLetters } from "../../utils/texts";
import Result from "../UI/CARDS/Result";
import { CSSTransition } from "react-transition-group";

const WriteCardBody = ({ items }) => {
  const [answer, setAnswer] = useState("");
  const [count, setCount] = useState([0, 0]); // const [card, setCard] = useState({ flip: false, num: 0, anim: false });
  const [num, setNum] = useState(0);
  const [flip, setFlip] = useState(false);
  const [anim, setShowAnim] = useState(false);
  const countLeft = () => items && num + 1 + "/" + items.length;
  const check = () => {
    if (flip) {
      setNum(Math.min(num + 1, items.length - 1));
      setAnswer("");
      setShowAnim(!anim);
    } else {
      let ra = onlyLetters(items[num].answer);
      let a = onlyLetters(answer);

      ra === a
        ? setCount([count[0] + 1, count[1]])
        : setCount([count[0], count[1] + 1]);
    }
    setFlip(!flip);
  };
  const isResult = items.length === count[0] + count[1] && !flip;
  return (
    <div className={cl.cardSize}>
      {isResult ? (
        <Result text="Job is done!" count={count} />
      ) : (
        <CSSTransition
          appear={true}
          in={true}
          timeout={500}
          classNames="result">
          <div className={cl["game-field"]}>
            <div className={cl.cardSize}>
              <OneCardG
                anim={anim}
                item={items[num]}
                flip={flip}
                clickable={false}
              />{" "}
            </div>
            <div className="d-flex align-items-center flex-wrap justify-content-center w-50 m-auto">
              <div className="d-flex flex-column">
                {!isResult && (
                  <GameCount
                    count={count}
                    all={items.length - count[0] - count[1]}
                    left={countLeft()}
                  />
                )}
                <Button onClick={check} size="lg" disabled={!answer}>
                  {flip ? "NEXT" : "CHECK AN ANSWER"}
                </Button>
              </div>
              <textarea
                type={"text"}
                value={answer}
                className={cl.writeAnswer}
                onKeyPress={(e) => {
                  if (e.key === "Enter") check();
                }}
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
              />{" "}
            </div>
          </div>
        </CSSTransition>
      )}
    </div>
  );
};

export default WriteCardBody;
