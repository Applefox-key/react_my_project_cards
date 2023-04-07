import React from "react";

import cl from "./AnimatedBtn.module.scss";
const AnimatedBtn = ({ title, ...props }) => {
  return (
    <button className={cl["learn-more"]} {...props}>
      <span className={cl["circle"]} style={{ ariaHidden: "true" }}>
        <span className={cl["icon"] + " " + cl["arrow"]}></span>
      </span>
      <span className={cl["button-text"]}>{title}</span>
    </button>
  );
};

export default AnimatedBtn;
