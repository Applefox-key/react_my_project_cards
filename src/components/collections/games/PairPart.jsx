import React from "react";
import cl from "./Games.module.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const PairPart = ({ items, onClick, num, active }) => {
  return (
    <TransitionGroup className={cl.container}>
      {items.map((el) => (
        <CSSTransition
          timeout={400}
          classNames="expression"
          key={el.id + "&" + num}>
          <button
            className={[
              cl.list_btn,
              num === 2 ? cl.answer : "",
              active === el.id + "&" + num ? cl["active" + num] : "",
            ].join(" ")}
            id={el.id + "&" + num}
            onClick={onClick}>
            {el[num === 1 ? "question" : "answer"]}/{el.id}
          </button>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default PairPart;
// className={[
//   cl.list_btn,
//   num === 2 ? cl.answer : "",
//   active === el.id + "&" + num ? cl.active : "",
// ].join(" ")}
