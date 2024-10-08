import React from "react";
import { Link } from "react-router-dom";

import cl from "./aboutPage.module.scss";

const TextBlock = ({ regBtn, isAuth = false, isLoginPage = false }) => {
  return (
    <div className={cl.text_container}>
      {isAuth ? (
        <>
          <div className={cl.text1}>Learn More </div>
          <div className={cl.text2}>about flash cards or</div>
          <div className={cl.text2}>
            <a
              href={`http://phrases.learnapp.me/about`}
              className={cl.text2 + " " + cl.btn}>
              Try 90 seconds method
            </a>
          </div>
        </>
      ) : (
        <>
          <div className={cl.text1}>Sign In to Learn Fast</div>
          <div className={cl.text2}>if you don’t have an account you can</div>
        </>
      )}
      {isLoginPage ? (
        <>
          <div className={cl.text2}>
            <button className={cl.text2 + " " + cl.btn} onClick={regBtn}>
              Register here
            </button>
            or
            <Link to="/about" className={cl.text2 + " " + cl.btn + " ms-3"}>
              Learn more
            </Link>
          </div>
        </>
      ) : (
        !isAuth && (
          <button className={cl.text2 + " " + cl.btn} onClick={regBtn}>
            {!isLoginPage ? "Register Here!" : "Join Us"}
          </button>
        )
      )}
    </div>
  );
};

export default TextBlock;
