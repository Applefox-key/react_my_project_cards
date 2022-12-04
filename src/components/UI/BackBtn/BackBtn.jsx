import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import cl from "./BackBtn.module.css";

const BackBtn = ({ path, variant = "dark", onClick, ...props }) => {
  const router = useNavigate();
  const back = () => {
    if (path) router(path);
    else if (onClick) onClick();
    else router(-1);
  };
  return (
    <Button variant={variant} onClick={back} {...props}>
      ❰ Back
    </Button>
  );
};

export default BackBtn;
