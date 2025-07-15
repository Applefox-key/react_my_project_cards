/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useParams } from "react-router-dom";
import cl from "../Games.module.scss";
import GameScore from "../GameScore";
import OneCardG from "../OneCardG";
import WriteCardAnswer from "./WriteCardAnswer";
import Result from "../../UI/CARDS/Result";
import Hint from "../Hint";
import WriteCardErrors from "./WriteCardErrors";
import VoiceInputBtns from "../../UI/VoiceBtns/VoiceInputBtns";

import { onlyLetters } from "../../../utils/texts";

const WriteCardBody = ({ items, setItems, setIsResult, isResult }) => {
  const [mistakes, setMistackes] = useState([]);
  const [score, setScore] = useState({
    r: 0,
    w: 0,
    t: items.length,
  });
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
      if (isError && !mistakes.includes(items[num])) {
        let nm = [...mistakes, items[num]];
        setMistackes(nm);
        setScore({ ...score, w: score.w + 1 });
      } else {
        setScore({ ...score, r: score.r + 1 });
      }

      setIsError(false);
      setNum(Math.min(num + 1, items.length - 1));

      setShowAnim(!anim);

      textRef.current?.focus();
    } else {
      const currentAnswer = textRef.current.value;
      let ra = onlyLetters(
        mode === "0" ? items[num].answer : items[num].question
      );
      let a = onlyLetters(currentAnswer);
      const isCorrect = ra === a;
      setIsError(!isCorrect);
    }
    setFlip(!flip);
  });

  useEffect(() => {
    if (score.t === score.r + score.w && !flip) setIsResult(true);
  }, [score.t, score.r, score.w, flip]);
  // const isResult = score.t === score.r + score.w && !flip;
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
  const voiceBtn = (
    <>
      <div className={cl.voiceInputWrap}>
        <VoiceInputBtns textRef={textRef} disable={flip} />
      </div>

      {isError && (
        <button onClick={tryAgain} className={"roundBtn"}>
          Again
        </button>
      )}
    </>
  );
  return (
    <>
      {items[num].note && <Hint text={items[num].note} />}
      {isResult ? (
        <Result
          text="Job is done!"
          score={score}
          mist={mistakes.length ? workWithErrors : null}
        />
      ) : (
        <CSSTransition appear in timeout={500} classNames="game">
          <>
            {!isResult && <GameScore score={score} />}
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
                children={voiceBtn}
                clAnsw={
                  cl.writeAnswer +
                  (flip ? (isError ? " wrongBack" : " rightBack") : "")
                }></WriteCardAnswer>
            </div>
          </>
        </CSSTransition>
      )}
    </>
  );
};

export default WriteCardBody;
