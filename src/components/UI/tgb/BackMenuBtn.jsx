import React from "react";
import "./tgb.scss";
import { useNavigate } from "react-router-dom";
import { RiArrowGoBackLine } from "react-icons/ri";
import { GO_TO } from "../../../router/routes";
const BackMenuBtn = () => {
  const router = useNavigate();
  return (
    <button
      className="viewBtn"
      data-title="Back"
      onClick={() => {
        if (window.history.length > 1) {
          router(-1);
        } else {
          router(GO_TO.about);
        }
      }}>
      <RiArrowGoBackLine />
    </button>
  );
};

export default BackMenuBtn;
