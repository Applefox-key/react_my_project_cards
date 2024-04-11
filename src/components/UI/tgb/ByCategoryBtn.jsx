import React from "react";
import "./tgb.scss";

import { FaLayerGroup } from "react-icons/fa";
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
      <FaLayerGroup />
      {/* <RiFoldersFill /> */}
    </button>
  );
};

export default ByCategoryBtn;
