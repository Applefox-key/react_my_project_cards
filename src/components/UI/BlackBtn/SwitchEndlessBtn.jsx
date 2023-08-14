import React from "react";
import { Button } from "react-bootstrap";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import cl from "./BackBtn.module.scss";

const SwitchEndlessBtn = ({ endless, setEndless }) => {
  return (
    <Button
      className="position-relative ms-1 me-1"
      size="lg"
      variant="dark"
      onClick={() => setEndless(!endless)}
      title={
        endless
          ? `press for ONE SHOT mode and go through all the questions in the collection once`
          : `press for ENDLESS mode to focus on questions you previously answered incorrectly`
      }>
      <HiOutlineSwitchVertical />
      <span className={cl.endlesTitle}>GAME MODE</span>
      <span className={cl.endlesName}>{endless ? "endless" : "one shot"}</span>
    </Button>
  );
};

export default SwitchEndlessBtn;
