import React from "react";
import { useNavigate } from "react-router-dom";
import { LuCopyPlus } from "react-icons/lu";
import { GO_TO } from "../../../router/routes";
import { HiPrinter } from "react-icons/hi";
import { RiArrowGoBackLine } from "react-icons/ri";

const OnePbCollectionBtns = ({ collection, addToMyCollection }) => {
  const router = useNavigate();

  return (
    <>
      <button
        className="viewBtn"
        data-title="Copy to my library"
        onClick={addToMyCollection}>
        <span>
          <LuCopyPlus />
        </span>
      </button>{" "}
      <button
        className="viewBtn"
        data-title="Print"
        onClick={() =>
          router(
            `${GO_TO.pubCollect}${GO_TO.print}/${collection.id}/${collection.name}`
          )
        }>
        {" "}
        <span>
          <HiPrinter />{" "}
        </span>
      </button>{" "}
      <button
        data-title="Back to collections list"
        className="viewBtn"
        onClick={() => router(GO_TO.pubCollect)}>
        <span>
          {" "}
          <RiArrowGoBackLine />{" "}
        </span>
      </button>{" "}
    </>
  );
};

export default OnePbCollectionBtns;
