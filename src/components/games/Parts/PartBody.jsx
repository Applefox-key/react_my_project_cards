import React, { useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import cl from "../Games.module.scss";

import Result from "../../UI/CARDS/Result";
import PartAnswer from "./PartAnswer";
import OneCardG from "../OneCardG";
import Hint from "../Hint";
import Parts from "./Parts";
import GameScore from "../GameScore";

const PartBody = ({ items, setItems }) => {
  const [num, setNum] = useState(0);
  const [activeIDs, setActiveIDs] = useState([]);
  const [score, setScore] = useState({
    r: 0,
    w: 0,
    t: items.length,
    num: items?.length ? 1 : 0,
  });
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
      setScore({ ...score, w: score.w + 1 });
      if (!mistakes.includes(items[num])) {
        let nm = [...mistakes];
        nm.push(items[num]);
        setMistackes(nm);
      }
    }
    if (answ.length === nV.length) {
      setScore({ ...score, r: score.r + 1, n: score.n + 1 });
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

  const hintT = () => {
    let ra = items[num].answ;
    let alength = activeVAL.length;
    if (alength < ra.length) {
      let nID = [...activeIDs];
      let nV = [...activeVAL];

      if (ra[nV.length - 1] !== nV[nV.length - 1]) {
        nID.pop();
        nV.pop();
      }
      alength = nV.length;
      let val = ra[alength];
      // П convert the ids array into a set for a quick search
      const set2 = new Set(nID);
      //  look for the first element in parts array that is not in Ids array
      for (let i = 0; i < items[num].parts.length; i++) {
        if (!set2.has(i.toString()) && items[num].parts[i] === val) {
          nID.push(i.toString());
          break;
        }
      }
      nV.push(val);
      setActiveVAL(nV);
      setActiveIDs(nID);

      if (ra.length === nV.length) {
        setScore({ ...score, r: score.r + 1, n: score.n + 1 });
        setTimeout(() => {
          setActiveVAL([]);
          setActiveIDs([]);
          setNum(num + 1);
        }, 500);
      }
    }
  };
  const rightBtn = {
    onClick: hintT,
    name: "HELP",
    fontstyleb: "fs-14",
  };
  return (
    <div>
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
              <div className={cl["game-field-parts"]}>
                <div className={cl.puzlcard}>
                  <OneCardG
                    item={items[num].item}
                    nonclickable
                    onlyFront
                    rightBtn={rightBtn}
                    noSound
                  />
                  <PartAnswer
                    item={items[num]}
                    onClick={undo}
                    activeVAL={activeVAL}
                  />
                </div>
                <div className={cl.pazlbox}>
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
                  />
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
