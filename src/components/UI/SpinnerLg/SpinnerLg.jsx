import React from "react";
import cl from "./SpinnerLg.module.scss";

const SpinnerLg = ({ ...props }) => {
  return (
    <div {...props}>
      <div className={cl.scanner}>
        Loading <span>....</span>
      </div>{" "}
    </div>
  );
};

export default SpinnerLg;
