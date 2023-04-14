import React from "react";
import { oneElemHorizontal } from "../../utils/cardFragment";

const CardColumn = ({ el, i, drugDrop, del, part }) => {
  return (
    <div
      key={el.id}
      id={el.id}
      className="horizontal_card me-4"
      {...drugDrop(i)}>
      <>{oneElemHorizontal(el, part)}</>
      <button onClick={() => del(el)}>❌</button>
    </div>
  );
};

export default CardColumn;
