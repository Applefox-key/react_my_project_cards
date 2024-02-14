import React, { useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Result from "../UI/CARDS/Result";
import GameCount from "./GameCount";
import cl from "./Games.module.scss";
import Hint from "./Hint";
import OneCardG from "./OneCardG";
import Parts from "./Parts";
import PartAnswer from "./PartAnswer";

const PartBody = ({ items, setItems }) => {
  const [num, setNum] = useState(0);
  const [activeIDs, setActiveIDs] = useState([]);
  const [count, setCount] = useState([0, 0]);
  const [activeVAL, setActiveVAL] = useState([]);
  const [mistakes, setMistackes] = useState([]);

  const clickPart = (e, answ) => {
    let id = e.target.id;
    let val = e.target.innerText ? e.target.innerText : " ";
    let nID = [...activeIDs];
    let nV = [...activeVAL];

    if (answ[nV.length - 1] !== nV[nV.length - 1]) {
      nID.pop();
      nV.pop();
    }
    nID.push(id);
    nV.push(val);
    setActiveVAL(nV);
    setActiveIDs(nID);

    if (answ[nV.length - 1] !== val) {
      setCount([count[0], count[1] + 1]);
      if (!mistakes.includes(items[num])) {
        let nm = [...mistakes];
        nm.push(items[num]);
        setMistackes(nm);
      }
    }
    if (answ.length === nV.length) {
      setCount([count[0] + 1, count[1]]);
      setTimeout(() => {
        setActiveVAL([]);
        setActiveIDs([]);
        setNum(num + 1);
      }, 500);
    }
  };
  const workWithErrors = () => {
    setItems(mistakes);
  };
  const undo = (e) => {
    let na = [...activeIDs];
    na.pop();
    let nr = [...activeVAL];
    nr.pop();
    setActiveVAL(nr);
    setActiveIDs(na);
  };
  return (
    <div>
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
              appear={false}
              timeout={500}
              key={num}
              classNames="cardChange">
              <div className={cl["game-field"]}>
                <OneCardG
                  direction={true}
                  item={items[num].item}
                  clickable={false}
                />{" "}
                <div className={cl.pazlbox}>
                  <PartAnswer
                    item={items[num]}
                    onClick={undo}
                    activeVAL={activeVAL}
                  />
                  <Parts
                    items={items[num].parts}
                    onClick={(e) => clickPart(e, items[num].answ)}
                    active={activeIDs}
                    lastOk={
                      items[num].answ[activeIDs.length - 1] ===
                      activeVAL[activeIDs.length - 1]
                        ? ""
                        : activeIDs[activeIDs.length - 1]
                    }
                  />{" "}
                </div>
              </div>
            </CSSTransition>
          </SwitchTransition>
        </>
      )}
    </div>
  );
};

export default PartBody;
