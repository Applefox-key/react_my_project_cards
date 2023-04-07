import React, { useState } from "react";
import Logo from "../../Logo";
import cl from "./login.module.scss";
import choice from "../../../img/man4.png";
import { Image } from "react-bootstrap";
import LoginBox from "./LoginBox";
import SignUpBox from "./SignUpBox";
import TextBlock from "../../AboutPage/TextBlock";
import ForgotBox from "./ForgotBox";
const Login = () => {
  const [loginMode, setLoginMode] = useState(1);
  return (
    <div>
      <br />
      <div className={cl.main_container_login}>
        <div className={cl.divimgLogin}>
          <Image rounded src={choice} className={cl.imgLogin} />
        </div>
        <TextBlock regBtn={() => setLoginMode(2)} />
        {loginMode === 1 && <LoginBox setLoginMode={setLoginMode} />}
        {loginMode === 2 && <SignUpBox setLoginMode={setLoginMode} />}
        {loginMode === 3 && <ForgotBox setLoginMode={setLoginMode} />}
      </div>
      <div className="w-10">
        <Logo />
      </div>
    </div>
  );
};

export default Login;
