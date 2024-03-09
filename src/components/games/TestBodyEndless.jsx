import React, { useEffect, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import TestOptions from "./TestOptions";
import cl from "./Games.module.scss";
import { testAnswerCheck } from "../../utils/games";
import Hint from "./Hint";
import { useParams } from "react-router-dom";
import OneCardG from "./OneCardG";
import ProbabilityList from "./ProbabilityList";
import {
  addProbabilities,
  recount,
  saveTempResults,
} from "../../utils/gamesResults";

const TestBodyEndless = ({ items }) => {
  const [num, setNum] = useState(0);
  const [anim, setAnim] = useState(0);
  const [allItems, setAllItems] = useState([]);
  const [active, setActive] = useState([]);
  const [right, setRight] = useState();
  const mode = useParams().mode;

  const choose = (e) => {
    let id = e.target.id ? e.target.id : e.target.parentElement.id;
    let res = testAnswerCheck(num, id, allItems);

    let [newNum, newArr] = recount(res, allItems, num);

    //right answer
    if (res) {
      setRight(id);
      setTimeout(() => {
        setRight("");
        if (!active.length) setNum(newNum);
        setActive([]);
        setAnim(1 - anim);
        saveTempResults(newArr[num], "test", mode);
      }, 300);
    } else {
      //wrong answer
      let na = [...active];
      na.push(id);
      setActive(na);
    }
    setAllItems(newArr);
  };

  useEffect(() => {
    addProbabilities(items, "test", mode, setAllItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {!!allItems.length && (
        <>
          {allItems[num].item.note ? (
            <Hint text={items[num].item.note} />
          ) : (
            <></>
          )}{" "}
          <ProbabilityList arr={allItems} />{" "}
          <SwitchTransition mode="out-in">
            <CSSTransition
              appear={false}
              timeout={500}
              key={anim}
              classNames="cardChange">
              <>
                <div className={cl["game-field"]}>
                  <OneCardG
                    item={allItems[num].item}
                    clickable={false}
                    progr={
                      allItems[num].probability === 1
                        ? 100
                        : 100 - allItems[num].probability * 5
                    }
                  />

                  <TestOptions
                    items={allItems[num].answ}
                    onClick={choose}
                    active={active}
                    right={right}
                    mode={parseInt(mode)}
                  />
                </div>
              </>
            </CSSTransition>
          </SwitchTransition>
        </>
      )}
    </>
  );
};

export default TestBodyEndless;
