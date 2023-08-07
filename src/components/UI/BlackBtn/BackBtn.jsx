import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BackBtn = ({ path, onClick, ...props }) => {
  const router = useNavigate();
  const back = () => {
    if (path) router(path);
    else if (onClick) onClick();
    else router(-1);
  };
  return (
    <Button size="lg" variant="dark" onClick={back} {...props}>
      ❰ Back
    </Button>
  );
};

export default BackBtn;
