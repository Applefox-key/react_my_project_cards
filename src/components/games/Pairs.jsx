import React, { useState } from "react";
import { useEffect } from "react";
import { useGame } from "../../hooks/useGame";
import MySpinner from "../UI/MySpinner";
import cl from "./Games.module.scss";
import PairPart from "./PairPart";
import { shuffle } from "../../utils/arraysFunc";
import GameCount from "./GameCount";
import Result from "../UI/CARDS/Result";
import BackBtn from "../UI/BackBtn/BackBtn";
import { CSSTransition } from "react-transition-group";
import { pairAnswerCheck } from "../../utils/games";

const Pairs = () => {
  const [items, setItems] = useState();
  const [itemsV, setItemsV] = useState([]);
  const [active, setActive] = useState();
  const [count, setCount] = useState([0, 0]);
  const contentParts = (arr = null) => {
    let newArr = arr ? shuffle([...arr]) : [...items];
    if (!newArr.length) return [[], []];
    let leng = newArr.length === 7 ? 7 : Math.min(6, newArr.length);
    let part = newArr.splice(0, leng);
    setItems(newArr);
    let a1 = shuffle([...part]);
    let a2 = shuffle([...part]);
    return [a1, a2];
  };
  const [getContent, isLoading] = useGame(setItemsV, contentParts);
  useEffect(() => {
    getContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const choose = (e) => {
    let tgId = e.target.id ? e.target.id : e.target.parentElement.id;
    if (!active) {
      setActive(tgId);
      return;
    }
    let [id1, set1] = [...active.split("&")];
    let [id2, set2] = [...tgId.split("&")];
    if (active === tgId) {
      setActive("");
      return;
    }
    if (set1 === set2) {
      setActive(tgId);
      return;
    }
    let [res, arr1, arr2] = pairAnswerCheck(id1, id2, itemsV);
    if (res) {
      if (arr1.length === 0) setItemsV(contentParts());
      else setItemsV([arr1, arr2]);
      setCount([count[0] + 1, count[1]]);
      setActive("");
    } else {
      setCount([count[0], count[1] + 1]);
    }
  };

  return (
    <>
      <BackBtn size="lg" />
      {isLoading || !items ? (
        <MySpinner />
      ) : (
        <CSSTransition
          in={true}
          appear={true}
          timeout={500}
          classNames="result">
          <div>
            <GameCount count={count} all={items.length + itemsV[0].length} />
            {items.length + itemsV[0].length === 0 ? (
              <Result text="Job is done!" />
            ) : (
              <div className={cl.pairs_container}>
                <PairPart
                  items={itemsV[0]}
                  onClick={choose}
                  num={1}
                  active={active}
                />
                <PairPart
                  items={itemsV[1]}
                  onClick={choose}
                  num={2}
                  active={active}
                />
              </div>
            )}{" "}
          </div>
        </CSSTransition>
      )}
    </>
  );
};

export default Pairs;
