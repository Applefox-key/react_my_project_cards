import React from "react";
import Logo from "../../UI/Logo";
import AboutBox from "../../AboutPage/AboutBox";

const MainPage = () => {
  return (
    <div appear in timeout={1000} classNames="game" unmountOnExit>
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
