import React from "react";
import "./tgb.scss";
import { AiOutlineRollback } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const BackMenuBtn = () => {
  const router = useNavigate();
  return (
    <button
      className="viewBtn"
      data-title="Back"
      onClick={() => {
        router(-1);
      }}>
      <AiOutlineRollback />
    </button>
  );
};

export default BackMenuBtn;
