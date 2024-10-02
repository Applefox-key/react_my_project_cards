/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";

import OneCardG from "../OneCardG";
import cl from "../Games.module.scss";
import { onlyLetters } from "../../../utils/texts";
import { CSSTransition } from "react-transition-group";
import { useParams } from "react-router-dom";
import Hint from "../Hint";

import ProbabilityList from "../ProbabilityList";
import {
  addProbabilities,
  recount,
  saveTempResults,
} from "../../../utils/gamesResults";
import WriteCardAnswer from "./WriteCardAnswer";
import VoiceBtns from "../../UI/VoiceBtns";
import WriteCardErrors from "./WriteCardErrors";

const WriteCardBodyEndless = ({ items }) => {
  const [num, setNum] = useState(0);
  const [allItems, setAllItems] = useState([]);
  const [flip, setFlip] = useState(false);
  const [anim, setShowAnim] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const mode = useParams().mode;
  const textRef = useRef(null);

  const hintT = () => {
    let ra = onlyLetters(
      mode === "0" ? allItems[num].answer : allItems[num].question
    );
    let a = onlyLetters(textRef.current.value);
    if (a.length < ra.length)
      textRef.current.value = textRef.current.value + ra[a.length];
  };

  const valProgress = () => {
    if (!flip)
      return allItems[num].probability === 1
        ? 100
        : 100 - allItems[num].probability * 5;
    let res = !isError;

    let newProb = Math.min(
      Math.max(allItems[num].probability + (res ? -1 : 1), 0),
      20
    );
    return 100 - newProb * 5;
  };
  const errorsShow = () => {
    setShowErr(!showErr);
  };
  const check = () => {
    if (flip) {
      // let el = document.getElementById("answerArea");
      // let res = el.className.includes("rightBack");
      let res = !isError;
      let [newNum, newArr] = recount(res, allItems, num);
      // el.classList.remove("rightBack", "wrongBack");
      // setAnswer("");
      textRef.current.value = "";
      setIsError(false);
      if (res) {
        setNum(newNum);
      }
      saveTempResults(newArr[num], "write", mode);
      setAllItems(newArr);
      // setNum(newNum);
      setShowAnim(!anim);
    } else {
      let ra = onlyLetters(
        mode === "0" ? allItems[num].answer : allItems[num].question
      );
      let a = onlyLetters(textRef.current.value);
      const isCorrect = ra === a;
      setIsError(!isCorrect);
      // document
      //   .getElementById("answerArea")
      //   .classList.add(ra === a ? "rightBack" : "wrongBack");
    }
    setFlip(!flip);
  };
  useEffect(() => {
    addProbabilities(items, "write", mode, setAllItems); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
      // disabled: !mistakes.includes(items[num]),
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
      {!!allItems.length && (
        <>
          {allItems[num].note ? <Hint text={allItems[num].note} /> : <></>}
          <ProbabilityList arr={allItems} />
          {showErr && (
            <WriteCardErrors
              setShowErrors={setShowErr}
              right={mode === "0" ? items[num].answer : items[num].question}
              useranswer={textRef.current.value}
              quest={mode === "0" ? items[num].question : items[num].answer}
            />
          )}
          <CSSTransition appear in timeout={500} classNames="result">
            <div className={cl["game-field"]}>
              <div className={cl.cardSize}>
                <OneCardG
                  anim={anim}
                  item={allItems[num]}
                  flip={flip}
                  nonclickable
                  leftBtn={
                    flip ? isError && buttons.leftBtnErr : buttons.leftBtn
                  }
                  rightBtn={buttons.rightBtn}
                  progr={valProgress()}
                />
              </div>
              {/* <div className={cl.writeBox}>
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
                />{" "}
              </div> */}

              <WriteCardAnswer
                textRef={textRef}
                onEnter={check}
                clAnsw={
                  cl.writeAnswer +
                  (flip ? (isError ? " wrongBack" : " rightBack") : "")
                }>
                <VoiceBtns textRef={textRef} disable={flip} />
              </WriteCardAnswer>
            </div>
          </CSSTransition>
        </>
      )}
    </>
  );
};

export default WriteCardBodyEndless;
