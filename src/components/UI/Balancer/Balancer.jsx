import React from "react";
import cl from "./Balancer.module.scss";
import { ProgressBar } from "react-bootstrap";
import {
  FaBalanceScale,
  FaBalanceScaleLeft,
  FaBalanceScaleRight,
} from "react-icons/fa";

const Balancer = ({ current }) => {
  return (
    <div className={cl["balancer-wrap"]}>
      <ProgressBar
        max={50}
        min={0}
        className={cl["balancer-leftWrap"]}
        variant="danger"
        animated
        now={current < 50 ? 50 - current : 0}
      />
      {current < 50 ? (
        <FaBalanceScaleLeft className={cl["balancer-icon"]} />
      ) : current > 50 ? (
        <FaBalanceScaleRight className={cl["balancer-icon"]} />
      ) : (
        <FaBalanceScale className={cl["balancer-icon"]} />
      )}

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

export default Balancer;
