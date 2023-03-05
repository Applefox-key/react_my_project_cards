import React from "react";
import cl from "./aboutPage.module.css";
import choice from "../../img/man_left.png";
import { Image } from "react-bootstrap";
import AboutGallery from "./AboutGallery";
import { useNavigate } from "react-router-dom";
import TextBlock from "./TextBlock";

const AboutBox = () => {
  const router = useNavigate();
  return (
    <>
      <Image rounded src={choice} className={cl.imgabout} />
      <TextBlock regBtn={() => router("/login")} isAboutLink={false} />
      <div className={cl.cardabout}>
        <AboutGallery />
      </div>
    </>
  );
};

export default AboutBox;
