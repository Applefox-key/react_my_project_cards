import React, { useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import MyCardStatic from "../UI/CARDS/MyCardStatic";
import Result from "../UI/CARDS/Result";
import GameCount from "./GameCount";
import TestOptions from "./TestOptions";
import cl from "./Games.module.scss";
import { testAnswerCheck } from "../../utils/games";
const TestBody = ({ items }) => {
  const [num, setNum] = useState(0);
  const [active, setActive] = useState([]);
  const [count, setCount] = useState([0, 0]);
  const [right, setRight] = useState();

  const choose = (e) => {
    // debugger;
    let res = testAnswerCheck(num, e.target.id, items);
    if (res) {
      setRight(e.target.id);
      setCount([count[0] + 1, count[1]]);
      setTimeout(() => {
        setRight("");
        setActive([]);
        setNum(num + 1);
      }, 300);
    } else {
      setCount([count[0], count[1] + 1]);
      let na = [...active];
      na.push(e.target.id);
      setActive(na);
    }
  };

  return (
    <div>
      {items.length !== num && (
        <GameCount count={count} all={items.length - num} />
      )}
      {items.length === num ? (
        <Result text="Job is done!" count={count} />
      ) : (
        <SwitchTransition mode="out-in">
          <CSSTransition
            appear={false}
            timeout={500}
            key={num}
            classNames="cardChange">
            <div className={cl["game-field"]}>
              <MyCardStatic item={items[num].item} />
              <TestOptions
                items={items[num].answ}
                onClick={choose}
                active={active}
                right={right}
              />
            </div>
          </CSSTransition>
        </SwitchTransition>
      )}
    </div>
  );
};

export default TestBody;
