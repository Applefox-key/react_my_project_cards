import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import cl from "./Games.module.scss";

const Rate = ({
  initialValue,
  notEditable = false,
  action = null,
  isSmall = false,
  classN = "",
}) => {
  const [value, setValue] = useState(initialValue);
  const labels = ["Very Bad", "Bad", "Ok", "Good", "Excellent"];
  const handleClick = (e, i) => {
    if (!notEditable) {
      e.stopPropagation();
      setValue(i);
      if (action) action(i);
    }
  };
  return (
    <div className={[isSmall ? cl.rateS : cl.rateB, classN].join(" ")}>
      {labels.map((el1, i) => (
        <div key={i} onClick={(e) => handleClick(e, i)}>
          {i <= value ? <FaStar /> : <FaRegStar className={cl.noactStar} />}
        </div>
      ))}
    </div>
  );
};

export default Rate;
