import React from "react";

import cl from "./AnimatedBtn.module.css";
const AnimatedBtn = ({ title, ...props }) => {
  return (
    <button class={cl["learn-more"]} {...props}>
      <span class={cl["circle"]} style={{ ariaHidden: "true" }}>
        <span class={cl["icon"] + " " + cl["arrow"]}></span>
      </span>
      <span class={cl["button-text"]}>{title}</span>
    </button>
  );
};

export default AnimatedBtn;
