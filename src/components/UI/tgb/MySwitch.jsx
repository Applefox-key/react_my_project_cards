import React from "react";
import "./tgb.scss";

const MySwitch = ({ checked, onChange, ...props }) => {
  return (
    <div onClick={onChange} {...props} className="w-100">
      <div className="wrapS">
        <div className="leftEl">{props.leftEl}</div>
        <div className="rightEl">{props.rightEl}</div>
        <div className={checked ? "choise l" : "choise"}>
          {checked ? props.rightEl : props.leftEl}
        </div>
      </div>
    </div>
  );
};

export default MySwitch;
