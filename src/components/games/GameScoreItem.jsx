import React from "react";
import cl from "./Games.module.scss";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const GameScoreItem = ({ value, lable, bg }) => {
  return (
    <SwitchTransition>
      <CSSTransition key={value} timeout={200} classNames={"count"}>
        <span className={bg}>
          {lable}
          {value}
        </span>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default GameScoreItem;

// <SwitchTransition>
//     <CSSTransition key={count[0]} timeout={200} classNames={"count"}>
//       <span className={result ? "right" : "right"}>
//         <FaRegThumbsUp />
//         {count[0]}
//       </span>
//     </CSSTransition>
//   </SwitchTransition>
//   {/* <CSSTransition key={count[1]} timeout={200} classNames={"count"}> */}
//   <span className={result ? "wrong" : "wrong"}>
//     <FaRegThumbsDown />
//     {count[1]}
//   </span>{" "}
// bg={bg}
