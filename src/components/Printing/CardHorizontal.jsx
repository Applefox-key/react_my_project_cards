import React from "react";
import { oneElemHorizontal } from "../../utils/cardFragment";

const CardHorizontal = ({ el, i, drugDrop, del }) => {
  return (
    <div key={el.id} id={el.id} className="horizontal_card" {...drugDrop(i)}>
      <>{oneElemHorizontal(el, "question")}</>
      <>{oneElemHorizontal(el, "answer")}</>
      <button onClick={() => del(el)}>❌</button>
    </div>
  );
};

export default CardHorizontal;
