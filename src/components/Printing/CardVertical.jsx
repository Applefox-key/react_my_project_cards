import React from "react";
import { oneElemVertical } from "../../utils/cardFragment";
import { useParams } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

const CardVertical = ({ el, i, drugDrop, del, mode }) => {
  const params = useParams();

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
      <>
        {oneElemVertical(
          el,
          "answer",
          <div className="print-name">
            <span className="card_name">
              {params.name}-{i + 1}{" "}
            </span>
            <span className="card_num">{i + 1}</span>
          </div>
        )}
      </>

      <div className="print_note">{el.note}</div>
    </div>
  );
};

export default CardVertical;
