import React from "react";
import cl from "../Games.module.scss";

const Parts = ({ items, onClick, active, lastOk }) => {
  const generateClassName = (i) => {
    return [
      cl.list_btn,
      active.includes(i.toString()) ? cl.wrong_answer : "",
      active.includes(i.toString()) && lastOk !== i.toString()
        ? cl.disactive_part
        : "",
    ].join(" ");
  };
  return (
    <div className={cl["part-options"]}>
      {items.map((el, i) => (
        <button
          key={i}
          id={i}
          onClick={onClick}
          disabled={active.includes(i.toString())}
          className={generateClassName(i)}>
          {el}
        </button>
      ))}
    </div>
  );
};

export default Parts;
