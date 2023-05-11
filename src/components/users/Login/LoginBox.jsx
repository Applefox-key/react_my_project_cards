import React from "react";
import { useState } from "react";
import { useContext } from "react";
import BaseAPI from "../../../API/BaseAPI";
import { AuthContext } from "../../../context";
import cl from "./login.module.scss";

import { Link, useNavigate, useParams } from "react-router-dom";
import { isEmailValid } from "../../../utils/validation";
import { usePopup } from "../../../hooks/usePopup";

const LoginBox = ({ setLoginMode }) => {
  const router = useNavigate();
  const pageParam = useParams();
  const [err, setErr] = useState("");
  // eslint-disable-next-line no-unused-vars
  const { userAuth, setUserAuth } = useContext(AuthContext);
  const [email, setEmail] = useState(
    pageParam.email ? pageParam.email : "JohnDoe@test.test"
  );
  const [password, setPassword] = useState("JohnDoe");
  const setPopup = usePopup();
  const login = async (event) => {
    if (!isEmailValid(email)) {
      setPopup.error("email is invalid");
      setErr("email is invalid");
      return;
    }
    if (!password) {
      setPopup.error("password is empty");
      setErr("password is empty");
      return;
    }
    try {
      let response = await BaseAPI.login(email, password);
      setUserAuth({ isAuth: true, role: response.role });
      router(`/manager`);
    } catch (error) {
      setPopup.error(error);
      setErr(error);
    }
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") login();
  };

  return (
    <div className={cl.containerlogin}>
      <div className={cl["login-box"]}>
        {" "}
        <div className="mb-2">
          <div className={cl["box-header"]}>
            <h2 className={cl.h2login}>Log In</h2>
          </div>{" "}
          <h4>or</h4>
          <Link className={cl.links} onClick={() => setLoginMode(2)}>
            Create Your Account
          </Link>
        </div>
        <label htmlFor="username">Email</label>
        <input
          value={email}
          type="email"
          id="email"
          onChange={(e) => {
            if (err) setErr("");
            setEmail(e.target.value);
          }}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onKeyPress={onKeyPress}
          type="password"
          id="password"
          onChange={(e) => {
            if (err) setErr("");
            setPassword(e.target.value);
          }}
        />{" "}
        <div className={cl.err}>{err}</div>
        <Link className={cl.links} onClick={() => setLoginMode(3)}>
          Forgot My Password
        </Link>
        <br />
        <br />
        <button type="submit" className={cl.btnlogin} onClick={login}>
          Sign In
        </button>
      </div>{" "}
    </div>
  );
};

export default LoginBox;
