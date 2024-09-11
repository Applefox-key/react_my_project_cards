import React from "react";
import "./tgb.scss";
import { MdLabel } from "react-icons/md";
const ByCategoryBtn = ({ ...props }) => {
  return (
    <button
      className={
        !!props.commonSettings.byCategory ? "viewBtn checked" : "viewBtn"
      }
      data-title=" show by categories"
      onClick={() =>
        props.setSettingsCommon("byCategory", !props.commonSettings.byCategory)
      }>
      <MdLabel />
    </button>
  );
};

export default ByCategoryBtn;
