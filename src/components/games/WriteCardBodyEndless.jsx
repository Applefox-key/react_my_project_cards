/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import OneCardG from "./OneCardG";
import cl from "./Games.module.scss";
import { onlyLetters } from "../../utils/texts";
import { CSSTransition } from "react-transition-group";
import { useParams } from "react-router-dom";
import Hint from "./Hint";
import { recount } from "../../utils/games";
import Balancer from "../UI/Balancer/Balancer";
import ProbabilityList from "./ProbabilityList";
import { addProbabilities, saveTempResults } from "../../utils/gamesResults";

const WriteCardBodyEndless = ({ items }) => {
  const [answer, setAnswer] = useState("");
  const [num, setNum] = useState(0);
  const [allItems, setAllItems] = useState([]);
  const [flip, setFlip] = useState(false);
  const [anim, setShowAnim] = useState(false);
  const mode = useParams().mode;

  const hintT = () => {
    let ra = onlyLetters(
      mode === "0" ? allItems[num].answer : allItems[num].question
    );
    let a = onlyLetters(answer);
    if (a.length < ra.length) setAnswer(answer + ra[a.length]);
  };

  const valProgress = () => {
    if (!flip)
      return allItems[num].probability === 1
        ? 100
        : 100 - allItems[num].probability * 5;
    let res = document
      .getElementById("answerArea")
      .className.includes("rightBack");

    let newProb = Math.min(
      Math.max(allItems[num].probability + (res ? -1 : 1), 0),
      20
    );
    return 100 - newProb * 5;
  };

  const check = () => {
    if (flip) {
      let el = document.getElementById("answerArea");
      let res = el.className.includes("rightBack");
      let [newNum, newArr] = recount(res, allItems, num);
      el.classList.remove("rightBack", "wrongBack");
      setAnswer("");
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
      let a = onlyLetters(answer);
      document
        .getElementById("answerArea")
        .classList.add(ra === a ? "rightBack" : "wrongBack");
    }
    setFlip(!flip);
  };
  useEffect(() => {
    addProbabilities(items, "write", mode, setAllItems); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {!!allItems.length && (
        <div className={cl.cardSize}>
          {allItems[num].note ? <Hint text={allItems[num].note} /> : <></>}
          <ProbabilityList arr={allItems} />
          <CSSTransition
            appear={true}
            in={true}
            timeout={500}
            classNames="result">
            <div className={cl["game-field"]}>
              {" "}
              <div className={cl.topEndless}>
                <div className="d-flex flex-column">
                  <Balancer current={valProgress()} key={num} />
                  <div className={cl.cardSize}>
                    <OneCardG
                      anim={anim}
                      item={allItems[num]}
                      flip={flip}
                      clickable={false}
                    />
                  </div>
                </div>
                <div className={cl.writeEndless}>
                  <div className={cl.writeBtns}>
                    <Button onClick={check} size="lg" disabled={!answer}>
                      {flip ? "NEXT" : "CHECK AN ANSWER"}
                    </Button>{" "}
                    <button
                      onClick={hintT}
                      size="lg"
                      disabled={flip}
                      className={cl.writeHint}>
                      SHOW THE NEXT LETTER
                    </button>
                  </div>
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
                </div>{" "}
              </div>
            </div>
          </CSSTransition>
        </div>
      )}
    </div>
  );
};

export default WriteCardBodyEndless;
