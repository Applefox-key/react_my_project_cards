import React, { useState } from "react";
import { useEffect } from "react";
import { useGame } from "../../../hooks/useGame";
import cl from "../Games.module.scss";
import { shuffle } from "../../../utils/arraysFunc";
import GameCount from "../GameCount";
import Result from "../../UI/CARDS/Result";
import BackBtn from "../../UI/BlackBtn/BackBtn";
import { CSSTransition } from "react-transition-group";
import { pairAnswerCheck } from "../../../utils/games";
import SpinnerLg from "../../UI/SpinnerLg/SpinnerLg";
import Hint from "../Hint";
import PairPart from "./PairPart";

const Pairs = () => {
  const [items, setItems] = useState();
  const [itemsV, setItemsV] = useState([]);
  const [active, setActive] = useState();
  const [note, setNote] = useState();
  const [count, setCount] = useState([0, 0]);

  const contentParts = (arr = null) => {
    let newArr = arr ? shuffle([...arr]) : [...items];
    if (!newArr.length) {
      setItemsV([[], []]);
      return;
    }
    let leng = newArr.length === 7 ? 7 : Math.min(6, newArr.length);
    let part = newArr.splice(0, leng);
    setItems(newArr);
    let a1 = shuffle([...part]);
    let a2 = shuffle([...part]);
    setItemsV([a1, a2]);
  };
  const [getContent, isLoading] = useGame(contentParts);

  useEffect(() => {
    getContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname, window.location.hash]);

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
      if (arr1.length === 0) setItemsV(contentParts());
      else setItemsV([arr1, arr2]);
      setCount([count[0] + 1, count[1]]);
      setActive("");
      setNote("");
    } else {
      setCount([count[0], count[1] + 1]);
    }
  };

  return (
    <div className="mainField">
      {note ? <Hint text={note} /> : <></>}
      <div className="menuField">
        <BackBtn />
      </div>
      {isLoading || !items ? (
        <SpinnerLg className="span_wrap" />
      ) : (
        <CSSTransition in={true} appear={true} timeout={500} classNames="game">
          <div>
            {items.length + itemsV[0].length !== 0 && (
              <GameCount count={count} all={items.length + itemsV[0].length} />
            )}
            {items.length + itemsV[0].length === 0 ? (
              <Result text="Job is done!" count={count} />
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
