import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import cl from "./BackBtn.module.scss";

const BackBtn = ({ path, onClick, ...props }) => {
  const router = useNavigate();
  const back = () => {
    if (path) {
      if (onClick) onClick();
      router(path);
    } else if (onClick) onClick();
    else router(-1);
  };
  return (
    <Button
      size="lg"
      variant="dark"
      onClick={back}
      {...props}
      className={cl.btnGame}>
      ❰ BACK
    </Button>
  );
};

export default BackBtn;
