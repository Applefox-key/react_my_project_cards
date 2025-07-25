import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import cl from "../Games.module.scss";

import Hint from "../Hint";
import Result from "../../UI/CARDS/Result";
import BackBtn from "../../UI/BlackBtn/BackBtn";
import PairPart from "./PairPart";
import SpinnerLg from "../../UI/SpinnerLg/SpinnerLg";

import { useGame } from "../../../hooks/useGame";

import { shuffle } from "../../../utils/arraysFunc";
import { pairAnswerCheck } from "../../../utils/games";
import SwitchRate from "../../UI/BlackBtn/SwitchRate";
import GameScore from "../GameScore";

const Pairs = () => {
  const [items, setItems] = useState(null);
  const [itemsV, setItemsV] = useState([]);
  const [active, setActive] = useState();
  const [note, setNote] = useState();
  const [filterRate, setFilterRate] = useState(null);
  const [score, setScore] = useState({ r: 0, w: 0, t: 0 });
  const contentParts = (arr = null) => {
    let newArr =
      arr !== null
        ? shuffle(
            filterRate
              ? arr.filter((el) => filterRate.includes(el.rate + 1))
              : arr
          )
        : [...items];
    if (!newArr.length) {
      setItemsV([[], []]);
      setScore({ ...score, t: 0 });
      return;
    }
    let leng = newArr.length === 7 ? 7 : Math.min(6, newArr.length);
    let part = newArr.splice(0, leng);
    setItems(newArr);

    setScore({ ...score, t: leng });
    let a1 = shuffle([...part]);
    let a2 = shuffle([...part]);
    setItemsV([a1, a2]);
  };
  const [getContent, isLoading] = useGame(contentParts);

  useEffect(() => {
    getContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname, window.location.hash, filterRate]);

  const itemNote = (ids) => {
    let [id, set] = [...ids.split("&")];

    let ind = itemsV[set - 1].findIndex(
      (el) => el.id.toString() === id.toString()
    );
    setNote(itemsV[set - 1][ind].note ? itemsV[set - 1][ind].note : "");
  };
  const choose = (e) => {
    let tgId = e.target.id ? e.target.id : e.target.parentElement.id;
    if (!active) {
      setActive(tgId);
      itemNote(tgId);
      return;
    }
    let [id1, set1] = [...active.split("&")];
    let [id2, set2] = [...tgId.split("&")];
    if (active === tgId) {
      setActive("");
      setNote("");
      return;
    }
    if (set1 === set2) {
      setActive(tgId);
      itemNote(tgId);
      return;
    }
    let [res, arr1, arr2] = pairAnswerCheck(id1, id2, itemsV);
    if (res) {
      if (arr1.length === 0) contentParts();
      else setItemsV([arr1, arr2]);
      setScore({ ...score, r: score.r + 1 });
      setActive("");
      setNote("");
    } else {
      setScore({ ...score, w: score.w + 1 });
    }
  };

  return (
    <div className="mainField">
      {note ? <Hint text={note} /> : <></>}
      <div className="gameTitle">Find pairs</div>
      <div className="menuField">
        <BackBtn /> <SwitchRate {...{ filterRate, setFilterRate }} />
      </div>
      {isLoading || !items ? (
        <SpinnerLg className="span_wrap" />
      ) : (
        <CSSTransition in appear timeout={500} classNames="game">
          <div>
            {items.length + itemsV[0].length !== 0 && (
              <GameScore score={score} />
            )}
            {items?.length + itemsV[0].length === 0 ? (
              score.t ? (
                <Result text="Job is done!" score={score} />
              ) : (
                <Result
                  text="Oops! No cards match the selected options"
                  noAgainBtn
                />
              )
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
    </div>
  );
};

export default Pairs;
