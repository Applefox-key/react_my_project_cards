/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useRef, useState } from "react";
import OneCardG from "../OneCardG";
import cl from "../Games.module.scss";
import GameCount from "../GameCount";
import { onlyLetters } from "../../../utils/texts";
import Result from "../../UI/CARDS/Result";
import { CSSTransition } from "react-transition-group";
import { useParams } from "react-router-dom";
import Hint from "../Hint";
import WriteCardErrors from "./WriteCardErrors";
import VoiceBtns from "../../UI/VoiceBtns";

const WriteCardBody = ({ items, setItems }) => {
  const [mistakes, setMistackes] = useState([]);
  const [count, setCount] = useState([0, 0]);
  const [num, setNum] = useState(0);
  const [showErr, setShowErr] = useState(false);
  const [flip, setFlip] = useState(false);
  const [anim, setShowAnim] = useState(false);
  const mode = useParams().mode;

  const hintT = () => {
    let ra = onlyLetters(
      mode === "0" ? items[num].answer : items[num].question
    );
    let a = onlyLetters(textRef.current.value);
    if (a.length < ra.length)
      textRef.current.value = textRef.current.value + ra[a.length];
  };
  const workWithErrors = useCallback(() => {
    setItems(mistakes);
  });

  const check = useCallback(() => {
    if (flip) {
      document
        .getElementById("answerArea")
        .classList.remove("rightBack", "wrongBack");
      setNum(Math.min(num + 1, items.length - 1));

      textRef.current.value = "";
      setShowAnim(!anim);
    } else {
      const currentAnswer = textRef.current.value;
      let ra = onlyLetters(
        mode === "0" ? items[num].answer : items[num].question
      );
      let a = onlyLetters(currentAnswer);
      const isCorrect = ra === a;

      if (!isCorrect) {
        let nm = [...mistakes];
        nm.push(items[num]);
        setMistackes(nm);
        setCount([count[0], count[1] + 1]);
      } else setCount([count[0] + 1, count[1]]);

      document
        .getElementById("answerArea")
        .classList.add(isCorrect ? "rightBack" : "wrongBack");
    }

    setFlip(!flip);
  });
  const isResult = items.length === count[0] + count[1] && !flip;
  const errorsShow = () => {
    setShowErr(!showErr);
  };
  const leftBtn = {
    onClick: hintT,
    name: "HELP",
    disabled: flip,
    fontstyleb: "fs-14",
  };
  const leftBtnErr = {
    onClick: errorsShow,
    name: "Info",
    disabled: !mistakes.includes(items[num]),
    fontstyleb: "fs-14",
  };
  const rightBtn = {
    onClick: check,
    name: flip ? "NEXT" : "CHECK",
    fontstyleb: "fs-14",
  };
  const textRef = useRef(null);
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
              {showErr && (
                <WriteCardErrors
                  setShowErrors={setShowErr}
                  right={mode === "0" ? items[num].answer : items[num].question}
                  useranswer={textRef.current.value}
                />
              )}
              <div className={cl.cardSize}>
                <OneCardG
                  anim={anim}
                  item={items[num]}
                  flip={flip}
                  nonclickable
                  leftBtn={
                    flip ? mistakes.includes(items[num]) && leftBtnErr : leftBtn
                  }
                  rightBtn={rightBtn}
                />
              </div>
              <div className={cl.writeBox}>
                <textarea
                  type={"text"}
                  id="answerArea"
                  ref={textRef}
                  className={cl.writeAnswer}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      check();
                    }
                  }}
                />
                <VoiceBtns textRef={textRef} />
              </div>
            </div>
          </>
        </CSSTransition>
      )}
    </>
  );
};

export default WriteCardBody;
