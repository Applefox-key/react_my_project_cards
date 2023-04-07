import React from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

const MyToggleBtnGroup = ({ checked, arr, onChange, ...props }) => {
  return (
    <ButtonGroup className="" {...props}>
      {arr.map((item, i) => (
        <ToggleButton
          key={i}
          id={item + (i + 1)}
          type="radio"
          variant="primary"
          name="radio"
          value={item.value}
          checked={checked === i}
          onChange={onChange}>
          {item}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
};

export default MyToggleBtnGroup;
