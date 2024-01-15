import React from "react";
import "./tgb.scss";
import { FaListAlt } from "react-icons/fa";

const ViewSwitch = ({ checked, onChange, ...props }) => {
  return (
    <div onClick={onChange} {...props}>
      <button
        data-title=" list view"
        className={checked ? "viewBtn checked" : "viewBtn"}>
        <FaListAlt />
      </button>
    </div>
  );
};

export default ViewSwitch;
