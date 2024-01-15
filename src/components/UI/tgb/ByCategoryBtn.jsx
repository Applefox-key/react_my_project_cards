import React from "react";
import "./tgb.scss";
import { RiFoldersFill } from "react-icons/ri";
const ByCategoryBtn = ({ ...props }) => {
  return (
    <button
      className={
        props.commonSettings.byCategory ? "viewBtn checked" : "viewBtn"
      }
      data-title=" show by categories"
      onClick={() =>
        props.setSettingsCommon("byCategory", !props.commonSettings.byCategory)
      }>
      <RiFoldersFill />
    </button>
  );
};

export default ByCategoryBtn;
