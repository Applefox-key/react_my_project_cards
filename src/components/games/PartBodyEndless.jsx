import React, { useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import cl from "./Games.module.scss";
import Hint from "./Hint";
import OneCardG from "./OneCardG";
import Parts from "./Parts";
import PartAnswer from "./PartAnswer";
import SwitchModeBtn from "../UI/BlackBtn/SwitchModeBtn";
import { recount } from "../../utils/games";
import Balancer from "../UI/Balancer/Balancer";

const PartBodyEndless = ({ items }) => {
  const [num, setNum] = useState(0);
  const [activeIDs, setActiveIDs] = useState([]);
  const [activeVAL, setActiveVAL] = useState([]);
  const [noMistake, setNoMistake] = useState(true);
  const [anim, setAnim] = useState(0);
  const [allItems, setAllItems] = useState(
    items.map((el) => {
      return { ...el, probability: 10 };
    })
  );

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
    //wrong answer
    if (noMistake && answ[nV.length - 1] !== val) {
      setNoMistake(false);
    }
    //right answer
    if (answ.length === nV.length) {
      let [newNum, newArr] = recount(noMistake, allItems, num);
      setAllItems(newArr);
      setTimeout(() => {
        setActiveVAL([]);
        setActiveIDs([]);
        setNoMistake(true);
        setNum(newNum);
        setAnim(1 - anim);
      }, 500);
    }
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
    <>
      <SwitchModeBtn modes={["QUESTIONS PARTS", "ANSWERS PARTS"]} />
      <div>
        (
        <>
          {allItems[num].item.note ? (
            <Hint text={allItems[num].item.note} />
          ) : (
            <></>
          )}
          <SwitchTransition mode="out-in">
            <CSSTransition
              appear={false}
              timeout={500}
              key={anim}
              classNames="cardChange">
              <div className={cl["game-field"]}>
                <div className="d-flex flex-column">
                  <Balancer
                    current={
                      allItems[num].probability === 1
                        ? 100
                        : 100 - allItems[num].probability * 5
                    }
                  />
                  <OneCardG
                    direction={true}
                    item={allItems[num].item}
                    clickable={false}
                  />{" "}
                  <PartAnswer
                    item={allItems[num]}
                    onClick={undo}
                    activeVAL={activeVAL}
                  />
                  <Parts
                    items={allItems[num].parts}
                    onClick={(e) => clickPart(e, allItems[num].answ)}
                    active={activeIDs}
                    lastOk={
                      allItems[num].answ[activeIDs.length - 1] ===
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
      </div>
    </>
  );
};

export default PartBodyEndless;
