import React from "react";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import cl from "./aboutPage.module.scss";

import TextBlock from "./TextBlock";
import AboutGallery from "./AboutGallery";

import choice3 from "../../img/FAQ.png";

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
