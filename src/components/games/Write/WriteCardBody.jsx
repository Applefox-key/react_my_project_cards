/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useParams } from "react-router-dom";

import cl from "../Games.module.scss";

import GameCount from "../GameCount";
import OneCardG from "../OneCardG";
import WriteCardAnswer from "./WriteCardAnswer";
import Result from "../../UI/CARDS/Result";
import Hint from "../Hint";
import WriteCardErrors from "./WriteCardErrors";
import VoiceBtns from "../../UI/VoiceBtns";

import { onlyLetters } from "../../../utils/texts";

const WriteCardBody = ({ items, setItems }) => {
  const [mistakes, setMistackes] = useState([]);
  const [count, setCount] = useState([0, 0]);
  const [num, setNum] = useState(0);
  const [showErr, setShowErr] = useState(false);
  const [flip, setFlip] = useState(false);
  const [anim, setShowAnim] = useState(false);
  const [isError, setIsError] = useState(false);
  const mode = useParams().mode;
  const textRef = useRef(null);

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
      textRef.current.value = "";
      setIsError(false);
      setNum(Math.min(num + 1, items.length - 1));
      setShowAnim(!anim);
    } else {
      const currentAnswer = textRef.current.value;
      let ra = onlyLetters(
        mode === "0" ? items[num].answer : items[num].question
      );
      let a = onlyLetters(currentAnswer);
      const isCorrect = ra === a;
      setIsError(!isCorrect);
      if (!isCorrect && !mistakes.includes(items[num])) {
        let nm = [...mistakes];
        nm.push(items[num]);
        setMistackes(nm);
        setCount([count[0], count[1] + 1]);
      } else {
        setCount([count[0] + 1, count[1]]);
      }
    }
    setFlip(!flip);
  });
  const isResult = items.length === count[0] + count[1] && !flip;
  const errorsShow = () => {
    setShowErr(!showErr);
  };
  const tryAgain = () => {
    textRef.current.value = "";
    setIsError(false);
    setFlip(!flip);
  };
  const buttons = {
    leftBtn: {
      onClick: hintT,
      name: "HELP",
      disabled: flip,
      fontstyleb: "fs-14",
    },
    leftBtnErr: {
      onClick: errorsShow,
      name: "Info",
      disabled: !mistakes.includes(items[num]),
      fontstyleb: "fs-14",
    },
    rightBtn: {
      onClick: check,
      name: flip ? "NEXT" : "CHECK",
      fontstyleb: "fs-14",
    },
  };

  return (
    <>
      {items[num].note && <Hint text={items[num].note} />}
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
                  quest={mode === "0" ? items[num].question : items[num].answer}
                />
              )}
              <div className={cl.cardSize}>
                <OneCardG
                  anim={anim}
                  noSound
                  item={items[num]}
                  flip={flip}
                  nonclickable
                  leftBtn={
                    flip ? isError && buttons.leftBtnErr : buttons.leftBtn
                  }
                  rightBtn={buttons.rightBtn}
                />
              </div>
              <WriteCardAnswer
                textRef={textRef}
                onEnter={check}
                clAnsw={
                  cl.writeAnswer +
                  (flip ? (isError ? " wrongBack" : " rightBack") : "")
                }>
                <div className={cl.voiceInputWrap}>
                  <VoiceBtns textRef={textRef} disable={flip} />
                  {isError && (
                    <button onClick={tryAgain} className={"roundBtn"}>
                      Again
                    </button>
                  )}
                </div>
              </WriteCardAnswer>
            </div>
          </>
        </CSSTransition>
      )}
    </>
  );
};

export default WriteCardBody;
