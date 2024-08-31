import React from "react";
import { oneElemHorizontal } from "../../utils/cardFragment";
import { useStretchingText } from "../../hooks/useStretchingText";
import { IoMdClose } from "react-icons/io";

const CardColumn = ({ el, i, drugDrop, del, part }) => {
  useStretchingText("print_text");
  return (
    <div
      key={el.id}
      id={el.id}
      className="horizontal_card me-4"
      {...drugDrop(i)}>
      <>{oneElemHorizontal(el, part)}</>
      <button onClick={() => del(el)}>
        <IoMdClose />
      </button>
    </div>
  );
};

export default CardColumn;
