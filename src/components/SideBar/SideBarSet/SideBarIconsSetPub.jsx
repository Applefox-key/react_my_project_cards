import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineRollback } from "react-icons/ai";
import { GrChapterAdd } from "react-icons/gr";
import { GO_TO } from "../../../router/routes";
import { HiPrinter } from "react-icons/hi";

const SideBarIconsSetPub = ({ collection, addToMyCollection }) => {
  const router = useNavigate();

  return (
    <>
      <button data-title="Copy to my collections" onClick={addToMyCollection}>
        <span>
          <GrChapterAdd />
        </span>
      </button>{" "}
      <button
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
        onClick={() => router(GO_TO.pubCollect)}>
        <span>
          {" "}
          <AiOutlineRollback />{" "}
        </span>
      </button>{" "}
    </>
  );
};

export default SideBarIconsSetPub;
