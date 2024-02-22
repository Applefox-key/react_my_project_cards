import React from "react";
import cl from "./ToggleView.module.scss";
import { IoList } from "react-icons/io5";
import { PiCards } from "react-icons/pi";

const ToggleView = ({ checked, onChange, ...props }) => {
  return (
    <div onClick={onChange} {...props}>
      <button data-title=" list view" className={cl.toggleBtn}>
        view {checked ? <IoList /> : <PiCards />}
      </button>
    </div>
  );
};

export default ToggleView;
