import React from "react";
import cl from "../SideBar.module.scss";
import { useNavigate } from "react-router-dom";
import { AiOutlineRollback } from "react-icons/ai";
import { HiPlus } from "react-icons/hi";

const SideBarPlay = ({
  addOne,
  setExpressions,
  onSelectCategory,
  ...props
}) => {
  const router = useNavigate();
  return (
    <div className={cl["sideBar-wrap"]}>
      <div className={cl["sideBar-narrow"]}>
        <button
          className={cl.shadow}
          onClick={() => props.setSettingsCommon("editEl", { id: "new" })}
          data-title="Create new playlist ">
          <HiPlus />
        </button>
        <button
          data-title="Back"
          onClick={() => {
            router(-1);
          }}
          className={cl.shadow}>
          <AiOutlineRollback />
        </button>{" "}
      </div>
    </div>
  );
};

export default SideBarPlay;
