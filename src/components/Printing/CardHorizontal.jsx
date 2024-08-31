import React from "react";
import { oneElemHorizontal } from "../../utils/cardFragment";
import { useStretchingText } from "../../hooks/useStretchingText";
import { IoMdClose } from "react-icons/io";

const CardHorizontal = ({ el, i, drugDrop, del }) => {
  useStretchingText("print_text");
  return (
    <div key={el.id} id={el.id} className="horizontal_card" {...drugDrop(i)}>
      <>{oneElemHorizontal(el, "question")}</>
      <>{oneElemHorizontal(el, "answer")}</>
      <button onClick={() => del(el)}>
        <IoMdClose />
      </button>
    </div>
  );
};

export default CardHorizontal;
