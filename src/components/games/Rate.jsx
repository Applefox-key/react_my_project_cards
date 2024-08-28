import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import cl from "./Games.module.scss";

const Rate = ({ initialValue, isEditable = false, action = null }) => {
  const [value, setValue] = useState(initialValue);
  const labels = ["Very Bad", "Bad", "Ok", "Good", "Excellent"];
  const handleClick = (i) => {
    if (isEditable) {
      setValue(i);
      if (action) action(i);
    }
  };
  return (
    <div className={isEditable ? cl.rateB : cl.rateS}>
      {labels.map((el1, i) => (
        <div key={i} onClick={() => handleClick(i)}>
          {i <= value ? <FaStar /> : <FaRegStar />}
        </div>
      ))}
    </div>
  );
};

export default Rate;
