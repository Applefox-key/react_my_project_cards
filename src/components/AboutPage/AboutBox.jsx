import React from "react";
import cl from "./aboutPage.module.scss";
import choice3 from "../../img/FAQ.png";
import { Image } from "react-bootstrap";
import AboutGallery from "./AboutGallery";
import { useNavigate } from "react-router-dom";
import TextBlock from "./TextBlock";

const AboutBox = () => {
  const router = useNavigate();

  const toLogin = () => {
    router("/login");
  };
  return (
    <>
      <div className={cl["wrap-img-about"]}>
        <Image src={choice3} className={cl.imgabout} />
        <TextBlock regBtn={() => router("/login")} />
      </div>
      <div className={cl.cardabout}>
        <AboutGallery />{" "}
        <div className={cl.yellow} onClick={toLogin}>
          Let's get to know each other better!
        </div>
      </div>
    </>
  );
};

export default AboutBox;
