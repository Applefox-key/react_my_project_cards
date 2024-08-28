import React from "react";
import "./tgb.scss";

const MySwitch = ({ checked, onChange, ...props }) => {
  return (
    <div onClick={onChange} {...props} className="w-100">
      <div className="wrapS">
        <div className="leftEl">{props.leftel}</div>
        <div className="rightEl">{props.rightel}</div>
        <div className={checked ? "choise l" : "choise"}>
          {checked ? props.rightel : props.leftel}
        </div>
      </div>
    </div>
  );
};

export default MySwitch;
