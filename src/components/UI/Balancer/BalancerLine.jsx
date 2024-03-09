import React from "react";
import cl from "./Balancer.module.scss";
import { ProgressBar } from "react-bootstrap";

const BalancerLine = ({ current }) => {
  return (
    <div className={cl["balancerLine-wrap"]}>
      <ProgressBar
        max={50}
        min={0}
        className={cl["balancer-leftWrap"]}
        variant="danger"
        animated
        now={current < 50 ? 50 - current : 0}
      />

      <ProgressBar
        max={50}
        min={0}
        variant="success"
        className={cl["balancer-rightWrap"]}
        animated
        now={current > 50 ? current - 50 : 0}
      />
    </div>
  );
};

export default BalancerLine;
