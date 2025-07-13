import React from "react";
import cl from "./ToggleView.module.scss";
import { MdViewCompact } from "react-icons/md";
import { HiOutlineViewList } from "react-icons/hi";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const ToggleView = ({ checked, onChange, ...props }) => {
  return (
    // <div onClick={onChange} {...props} className="me-2">
    <button
      data-title=" list or card view"
      className={cl.toggleBtn}
      onClick={onChange}
      {...props}>
      <SwitchTransition mode="out-in">
        <CSSTransition key={checked} timeout={200} classNames="count">
          {checked ? (
            <HiOutlineViewList className="me-1" />
          ) : (
            <MdViewCompact className="me-1" />
          )}
        </CSSTransition>
      </SwitchTransition>
    </button>
    // </div>
  );
};

export default ToggleView;
