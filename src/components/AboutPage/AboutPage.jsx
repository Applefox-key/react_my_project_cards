import React from "react";
import cl from "./aboutPage.module.css";
import choice from "../../img/man_left.png";
import { Image } from "react-bootstrap";
import AboutGallery from "./AboutGallery";
// import { useNavigate } from "react-router-dom";
import TextBlock from "./TextBlock";
import Logo from "../Logo";

const AboutPage = () => {
  // const router = useNavigate();
  return (
    <>
      <div>
        {" "}
        <br />
        <div className="main_container">
          <Image rounded src={choice} className={cl.imgabout} />
          <TextBlock
            // regBtn={() => router("/login")}
            isAboutLink={false}
            aboutPage={true}
          />
          <div className={cl.cardabout}>
            <AboutGallery />
          </div>
        </div>
        <div className="w-10">
          <Logo />
        </div>
      </div>
    </>
  );
};

export default AboutPage;
