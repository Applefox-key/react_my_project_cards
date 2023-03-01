import React, { useState } from "react";
import Logo from "../../Logo";
import cl from "./login.module.css";
import choice from "../../../img/man4.png";
import { Image } from "react-bootstrap";
import LoginBox from "./LoginBox";
import SignUpBox from "./SignUpBox";
import TextBlock from "./TextBlock";
const Login = () => {
  const [loginMode, setLoginMode] = useState(true);
  return (
    <div>
      <br />
      <div className={cl.main_container_login}>
        <div className={cl.divimgLogin}>
          <Image rounded src={choice} className={cl.imgLogin} />
        </div>
        <TextBlock regBtn={() => setLoginMode(false)} />
        <div className="color_container"></div>

        {/* <AboutBox /> */}
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
