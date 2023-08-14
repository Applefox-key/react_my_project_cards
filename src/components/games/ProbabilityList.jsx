import React, { useState } from "react";
import cl from "./Games.module.scss";
import { Button } from "react-bootstrap";
import BalancerMini from "../UI/Balancer/BalancerMini";

const ProbabilityList = ({ arr }) => {
  const [show, setShow] = useState(0);
  const switchShow = () => {
    setShow(1 - show);
  };
  return (
    <div className={cl.probListWrap} onClick={switchShow}>
      <Button
        size="lg"
        variant={show ? "warning" : "dark"}
        className={cl.probabilityBtn}>
        Results
      </Button>

      {show ? (
        <div className={cl.probList}>
          {arr.map((el) => (
            <div className={cl.probListRow}>
              <div className={cl.probListText}>
                <span>{el.item ? el.item.question : el.question}</span>-
                {el.item ? el.item.answer : el.answer}
              </div>
              <BalancerMini
                current={el.probability === 1 ? 100 : 100 - el.probability * 5}
              />{" "}
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProbabilityList;
