import React from "react";
import { useState } from "react";
import Logo from "../Logo";
import AboutBox from "./AboutBox";

import cl from "./login.module.css";

import LoginBox from "./LoginBox";
import SignUpBox from "./SignUpBox";

const Login = ({ mode = "0", flip, clc = true }) => {
  const [loginMode, setLoginMode] = useState(true);
  return (
    <div className={cl.page}>
      <br />
      <div className="d-flex mt-5">
        <AboutBox />
        {loginMode ? (
          <LoginBox setLoginMode={setLoginMode} />
        ) : (
          <SignUpBox setLoginMode={setLoginMode} />
        )}
      </div>
      <div className="w-10">
        <Logo />
      </div>
    </div>
  );
};

export default Login;
