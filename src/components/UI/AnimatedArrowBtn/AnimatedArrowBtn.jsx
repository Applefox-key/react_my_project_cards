import React from "react";

import cl from "./AnimatedArrowBtn.module.css";
const AnimatedArrowBtn = ({ title, ...props }) => {
  return (
    <button className={cl.btn} {...props}>
      Next
    </button>
  );
};

export default AnimatedArrowBtn;
