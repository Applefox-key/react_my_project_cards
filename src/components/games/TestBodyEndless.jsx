import React, { useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import TestOptions from "./TestOptions";
import cl from "./Games.module.scss";
import { recount, testAnswerCheck } from "../../utils/games";
import Hint from "./Hint";
import { useParams } from "react-router-dom";
import OneCardG from "./OneCardG";
import Balancer from "../UI/Balancer/Balancer";
import ProbabilityList from "./ProbabilityList";

const TestBodyEndless = ({ items }) => {
  const [num, setNum] = useState(0);
  const [anim, setAnim] = useState(0);
  const [allItems, setAllItems] = useState(
    items.map((el) => {
      return { ...el, probability: 10 };
    })
  );
  const [active, setActive] = useState([]);
  const [right, setRight] = useState();
  const mode = useParams().mode;

  const choose = (e) => {
    let id = e.target.id ? e.target.id : e.target.parentElement.id;
    let res = testAnswerCheck(num, id, allItems);

    let [newNum, newArr] = recount(res, allItems, num);
    setAllItems(newArr);
    //right answer
    if (res) {
      setRight(id);
      setTimeout(() => {
        setRight("");
        setActive([]);
        setNum(newNum);
        setAnim(1 - anim);
      }, 300);
    } else {
      //wrong answer
      let na = [...active];
      na.push(id);
      setActive(na);
    }
  };

  return (
    <>
      <div>
        {!!allItems.length && (
          <>
            {allItems[num].item.note ? (
              <Hint text={items[num].item.note} />
            ) : (
              <></>
            )}{" "}
            <ProbabilityList arr={allItems} />
            <SwitchTransition mode="out-in">
              <CSSTransition
                appear={false}
                timeout={500}
                key={anim}
                classNames="cardChange">
                <div className={cl["game-field"]}>
                  <div className="d-flex flex-column">
                    {" "}
                    <Balancer
                      current={
                        allItems[num].probability === 1
                          ? 100
                          : 100 - allItems[num].probability * 5
                      }
                    />{" "}
                    <OneCardG
                      direction={true}
                      item={allItems[num].item}
                      clickable={false}
                    />
                  </div>

                  <TestOptions
                    items={allItems[num].answ}
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
    </>
  );
};

export default TestBodyEndless;
