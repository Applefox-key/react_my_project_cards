import React from "react";
import "./tgb.scss";
import { useNavigate } from "react-router-dom";
import { RiArrowGoBackLine } from "react-icons/ri";
const BackMenuBtn = () => {
  const router = useNavigate();
  return (
    <button
      className="viewBtn"
      data-title="Back"
      onClick={() => {
        router(-1);
      }}>
      <RiArrowGoBackLine />
    </button>
  );
};

export default BackMenuBtn;
