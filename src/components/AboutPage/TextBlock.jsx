import React from "react";
import { Link } from "react-router-dom";
import cl from "./aboutPage.module.css";
const TextBlock = ({ regBtn, isAboutLink = true, aboutPage = false }) => {
  return (
    <div className={cl.text_container}>
      {" "}
      {aboutPage ? (
        <>
          <div className={cl.text1}>Learn More</div>
          <div className={cl.text2}>about flash cards</div>
          <div className={cl.text2}>or</div>
          <a
            href={`http://phrases.learnapp.me/about`}
            className={cl.text2 + " " + cl.btn}>
            Try 90 seconds method
          </a>
        </>
      ) : (
        <>
          {" "}
          <div className={cl.text1}>Sign In to Learn Fast</div>
          <div className={cl.text2}>if you don’t have an account you can</div>
          <button className={cl.text2 + " " + cl.btn} onClick={regBtn}>
            {isAboutLink ? "Register Here! →" : "Join Us"}
          </button>
        </>
      )}
      {isAboutLink && (
        <>
          <div className={cl.text2}>or</div>

          <Link to="/about" className={cl.text2 + " " + cl.btn}>
            ← Learn More
          </Link>
        </>
      )}
    </div>
  );
};

export default TextBlock;
