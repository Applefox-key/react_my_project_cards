import React from "react";
import "./tgb.scss";
import { BiSolidRightArrow } from "react-icons/bi";

const SidebarShowBtn = ({ ...props }) => {
  return (
    <button
      className={props.sideBar ? "viewBtn checkedR" : "viewBtn"}
      data-title={props["data-title"]}
      onClick={props.onClick}>
      <BiSolidRightArrow />
    </button>
  );
};

export default SidebarShowBtn;
