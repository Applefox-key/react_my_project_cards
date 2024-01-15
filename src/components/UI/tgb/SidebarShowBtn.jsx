import React from "react";
import "./tgb.scss";

const SidebarShowBtn = ({ ...props }) => {
  return (
    <button
      className={props.sideBar ? "viewBtn checked" : "viewBtn"}
      data-title={props["data-title"]}
      onClick={props.onClick}>
      ☰
    </button>
  );
};

export default SidebarShowBtn;
