import React from "react";
import { oneElemVertical } from "../../utils/cardFragment";
import { useParams } from "react-router-dom";
import { useStretchingText } from "../../hooks/useStretchingText";
import { IoMdClose } from "react-icons/io";

const CardVertical = ({ el, i, drugDrop, del, mode }) => {
  const params = useParams();
  useStretchingText("print_text");
  return (
    <div
      key={el.id}
      id={el.id}
      className={!mode ? "vertical_card width800" : "vertical_card"}
      {...drugDrop(i)}>
      <button onClick={() => del(el)}>
        <IoMdClose />
      </button>
      <>{oneElemVertical(el, "question")}</>
      <>{oneElemVertical(el, "answer")}</>
      <div className="print-name">
        {params.name} <span>{i + 1}</span>
      </div>
    </div>
  );
};

export default CardVertical;
