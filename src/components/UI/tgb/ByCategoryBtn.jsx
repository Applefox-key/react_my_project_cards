import React from "react";

import "./tgb.scss";
import { AiOutlineFolder } from "react-icons/ai";

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
      <AiOutlineFolder />
    </button>
  );
};

export default ByCategoryBtn;
