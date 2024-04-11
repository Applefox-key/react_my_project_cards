import React from "react";
import cl from "./aboutPage.module.scss";
import choice from "../../img/man_left.png";
import { Image } from "react-bootstrap";
import AboutGallery from "./AboutGallery";
import TextBlock from "./TextBlock";
import Logo from "../Logo";

const AboutPage = () => {
  return (
    <>
      <div>
        {" "}
        <br />
        <div className="main_container position-relative">
          <Image rounded src={choice} className={cl.imgabout} />
          <TextBlock isAboutLink={false} aboutPage />
          <div className={cl.cardabout}>
            <AboutGallery />
          </div>{" "}
        </div>
        <div className="w-10">
          <Logo />
        </div>
      </div>
    </>
  );
};

export default AboutPage;
