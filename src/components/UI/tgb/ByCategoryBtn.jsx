import React from "react";
import { MdLabel } from "react-icons/md";

import "./tgb.scss";

const ByCategoryBtn = ({ ...props }) => {
  return (
    <button
      className={
        !!props.commonSettings.byCategory
          ? "viewBtn checked byCatBtn"
          : "viewBtn byCatBtn"
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
