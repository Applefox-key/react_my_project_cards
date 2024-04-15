import React from "react";
import Logo from "../../Logo";
import AboutBox from "../../AboutPage/AboutBox";

const MainPage = () => {
  return (
    <div>
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
