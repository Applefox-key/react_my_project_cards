import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import cl from "./Games.module.scss";

const Rate = ({
  initialValue,
  notEditable = false,
  action = null,
  isSmall = false,
}) => {
  const [value, setValue] = useState(initialValue);
  const labels = ["Very Bad", "Bad", "Ok", "Good", "Excellent"];
  const handleClick = (e, i) => {
    e.stopPropagation();
    if (!notEditable) {
      setValue(i);
      if (action) action(i);
    }
  };
  return (
    <div className={isSmall ? cl.rateS : cl.rateB}>
      {labels.map((el1, i) => (
        <div key={i} onClick={(e) => handleClick(e, i)}>
          {i <= value ? <FaStar /> : <FaRegStar />}
        </div>
      ))}
    </div>
  );
};

export default Rate;
