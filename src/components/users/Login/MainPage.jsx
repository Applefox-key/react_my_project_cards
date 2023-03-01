import React from "react";
import Logo from "../../Logo";
import AboutBox from "../../AboutPage/AboutBox";

import cl from "./login.module.css";

const MainPage = () => {
  return (
    <div>
      {" "}
      <div className="color_container"></div>
      <br />
      <div className="main_container">
        <AboutBox />
      </div>
      <div className="w-10">
        <Logo />
      </div>
    </div>
  );
};

export default MainPage;
