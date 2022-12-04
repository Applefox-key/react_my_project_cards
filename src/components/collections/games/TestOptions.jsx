import React from "react";
import cl from "./Games.module.css";

const TestOptions = ({ items, onClick, active, right }) => {
  return (
    <div className="flex-center flex-wrap">
      {items.map((el) => (
        <button
          key={el.id}
          id={el.id}
          onClick={onClick}
          disabled={right !== el.id.toString() && right}
          className={[
            cl.list_btn,
            active.includes(el.id.toString()) ? cl.wrong_answer : "",
            right === el.id.toString() ? cl.right_answer : "",
          ].join(" ")}>
          {el.answer}
        </button>
      ))}
    </div>
  );
};

export default TestOptions;
