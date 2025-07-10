import React, { useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useParams } from "react-router-dom";

import cl from "../Games.module.scss";

import Result from "../../UI/CARDS/Result";
import TestOptions from "./TestOptions";
import Hint from "../Hint";
import OneCardG from "../OneCardG";

import { testAnswerCheck } from "../../../utils/games";
import GameScore from "../GameScore";

const TestBody = ({ items, setItems }) => {
  const [num, setNum] = useState(0);
  const [active, setActive] = useState([]);

  const [score, setScore] = useState({ r: 0, w: 0, t: items.length });
  const [right, setRight] = useState();
  const [mistakes, setMistackes] = useState([]);
  const mode = useParams().mode;
  const workWithErrors = () => {
    setItems(mistakes);
  };
  const choose = (e) => {
    let id = e.target.id ? e.target.id : e.target.parentElement.id;
    let res = testAnswerCheck(num, id, items);
    if (res) {
      setRight(id);
      setScore({ ...score, "r": score.r + 1 });
      setTimeout(() => {
        setRight("");
        setActive([]);
        setNum(num + 1);
      }, 300);
    } else {
      setScore({ ...score, "w": score.r + 1 });
      let na = [...active];
      na.push(id);
      setActive(na);
      if (!mistakes.includes(items[num])) {
        let nm = [...mistakes];
        nm.push(items[num]);
        setMistackes(nm);
      }
    }
  };
  return (
    <div className="mt-4">
      {items.length === num ? (
        num ? (
          <Result
            text="Job is done!"
            score={score}
            mist={mistakes.length ? workWithErrors : null}
          />
        ) : (
          <Result text="Oops! No cards match the selected options" noAgainBtn />
        )
      ) : (
        <>
          {items[num].item.note ? <Hint text={items[num].item.note} /> : <></>}
          {items.length !== num && <GameScore score={score} />}
          <SwitchTransition mode="out-in">
            <CSSTransition
              // appear={false}
              timeout={500}
              key={num}
              classNames="cardChange">
              <div className={cl["game-field"]}>
                <OneCardG item={items[num].item} nonclickable onlyFront />
                <TestOptions
                  items={items[num].answ}
                  onClick={choose}
                  active={active}
                  right={right}
                  mode={parseInt(mode)}
                />
              </div>
            </CSSTransition>
          </SwitchTransition>
        </>
      )}
    </div>
  );
};

export default TestBody;
