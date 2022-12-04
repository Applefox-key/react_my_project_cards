import React from "react";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";

const ToggleBtnGroup = ({ checked, arr, onChange, ...props }) => {
  return (
    <ToggleButtonGroup
      type="radio"
      defaultValue={checked ? checked : 1}
      {...props}>
      {arr.map((item, i) => (
        <ToggleButton
          checked={checked === i + 1}
          id={item + (i + 1)}
          key={i}
          value={i + 1}
          onChange={onChange}>
          {item}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default ToggleBtnGroup;
