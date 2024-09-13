import React from "react";
import cl from "./aboutPage.module.scss";
import choice3 from "../../img/FAQ.png";
import { Image } from "react-bootstrap";
import AboutGallery from "./AboutGallery";
import TextBlock from "./TextBlock";
import Logo from "../Logo";
import { CSSTransition } from "react-transition-group";

const FAQPage = () => {
  return (
    <>
      <CSSTransition appear in timeout={1000} classNames="game" unmountOnExit>
        <>
          <br />
          <div className="main_container position-relative">
            <div className={cl["wrap-img-about"]}>
              <Image rounded src={choice3} className={cl.imgabout} />
              <TextBlock isAboutLink={false} isAuth />
            </div>
            <div className={cl.cardabout}>
              <AboutGallery />
            </div>{" "}
          </div>
          <div className="w-10">
            <Logo />
          </div>
        </>
      </CSSTransition>
    </>
  );
};

export default FAQPage;
