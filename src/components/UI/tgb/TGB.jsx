import React from "react";
import "./tgb.scss";

const TGB = ({ checked, onChange, ...props }) => {
  return (
    <div onClick={onChange} {...props}>
      <div className="wrap">
        <div className="left">cards</div>
        <div className="right">table</div>
        <div className={checked ? "choise l" : "choise"}>
          {checked ? "table" : "cards"}
        </div>
      </div>
    </div>
  );
};

export default TGB;
