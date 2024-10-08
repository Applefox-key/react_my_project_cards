import React from "react";
import { useNavigate } from "react-router-dom";

import "./home.scss";

const ToLoginBtn = () => {
  const router = useNavigate();
  const toLogin = () => {
    router("/login");
  };
  return (
    <div className="yellow" onClick={toLogin}>
      Let's get to know each other better!
    </div>
  );
};

export default ToLoginBtn;
