/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import OneCardG from "../OneCardG";
import cl from "../Games.module.scss";
import GameCount from "../GameCount";
import { onlyLetters } from "../../../utils/texts";
import Result from "../../UI/CARDS/Result";
import { CSSTransition } from "react-transition-group";
import { useParams } from "react-router-dom";
import Hint from "../Hint";

const WriteCardBody = ({ items, setItems }) => {
  const [answer, setAnswer] = useState("");
  const [mistakes, setMistackes] = useState([]);
  const [count, setCount] = useState([0, 0]);
  const [num, setNum] = useState(0);
  const [flip, setFlip] = useState(false);
  const [anim, setShowAnim] = useState(false);
  const mode = useParams().mode;

  const hintT = () => {
    let ra = onlyLetters(
      mode === "0" ? items[num].answer : items[num].question
    );
    let a = onlyLetters(answer);
    if (a.length < ra.length) setAnswer(answer + ra[a.length]);
  };
  const workWithErrors = () => {
    setItems(mistakes);
  };
  const check = () => {
    if (flip) {
      document
        .getElementById("answerArea")
        .classList.remove("rightBack", "wrongBack");
      setNum(Math.min(num + 1, items.length - 1));
      setAnswer("");
      setShowAnim(!anim);
    } else {
      let ra = onlyLetters(
        mode === "0" ? items[num].answer : items[num].question
      );
      let a = onlyLetters(answer);
      ra === a
        ? setCount([count[0] + 1, count[1]])
        : setCount([count[0], count[1] + 1]);
      if (ra !== a) {
        let nm = [...mistakes];
        nm.push(items[num]);

        setMistackes(nm);
      }
      document
        .getElementById("answerArea")
        .classList.add(ra === a ? "rightBack" : "wrongBack");
    }
    setFlip(!flip);
  };
  const isResult = items.length === count[0] + count[1] && !flip;

  const leftBtn = {
    onClick: hintT,
    name: "HELP",
    disabled: flip,
    fontstyleb: "fs-14",
  };
  const rightBtn = {
    onClick: check,
    name: flip ? "NEXT" : "CHECK",
    fontstyleb: "fs-14",
  };
  return (
    <>
      {items[num].note ? <Hint text={items[num].note} /> : <></>}
      {isResult ? (
        <Result
          text="Job is done!"
          count={count}
          mist={mistakes.length ? workWithErrors : null}
        />
      ) : (
        <CSSTransition appear in timeout={500} classNames="game">
          <>
            {!isResult && (
              <GameCount
                count={count}
                all={items.length - count[0] - count[1]}
              />
            )}
            <div className={cl["game-field"]}>
              <div className={cl.cardSize}>
                <OneCardG
                  anim={anim}
                  item={items[num]}
                  flip={flip}
                  nonclickable
                  leftBtn={leftBtn}
                  rightBtn={rightBtn}
                />
              </div>
              <div className={cl.writeBox}>
                <textarea
                  type={"text"}
                  id="answerArea"
                  value={answer}
                  className={cl.writeAnswer}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      check();
                    }
                  }}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                  }}
                />
              </div>
            </div>
          </>
        </CSSTransition>
      )}
    </>
  );
};

export default WriteCardBody;
