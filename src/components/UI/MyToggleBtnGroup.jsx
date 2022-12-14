import React from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

const MyToggleBtnGroup = ({ checked, arr, onChange, ...props }) => {
  console.log(checked);

  return (
    <ButtonGroup className="" {...props}>
      {arr.map((item, i) => (
        <ToggleButton
          key={i}
          id={item + (i + 1)}
          type="radio"
          variant="primaty"
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
