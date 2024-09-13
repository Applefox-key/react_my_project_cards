import React, { useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Result from "../../UI/CARDS/Result";
import GameCount from "../GameCount";
import TestOptions from "./TestOptions";
import cl from "../Games.module.scss";
import { testAnswerCheck } from "../../../utils/games";
import Hint from "../Hint";
import { useParams } from "react-router-dom";
import OneCardG from "../OneCardG";

const TestBody = ({ items, setItems }) => {
  const [num, setNum] = useState(0);
  const [active, setActive] = useState([]);
  const [count, setCount] = useState([0, 0]);
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
      setCount([count[0] + 1, count[1]]);
      setTimeout(() => {
        setRight("");
        setActive([]);
        setNum(num + 1);
      }, 300);
    } else {
      setCount([count[0], count[1] + 1]);
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
        <Result
          text="Job is done!"
          count={count}
          mist={mistakes.length ? workWithErrors : null}
        />
      ) : (
        <>
          {items[num].item.note ? <Hint text={items[num].item.note} /> : <></>}
          {items.length !== num && (
            <GameCount count={count} all={items.length - num} />
          )}
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
