import React, { useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import cl from "./login.module.scss";

import { usePopup } from "../../../hooks/usePopup";
import { isEmailValid } from "../../../utils/validation";
import { AuthContext } from "../../../context";
import BaseAPI from "../../../API/BaseAPI";
import { getuserDef } from "../../../utils/userSettings";

const LoginBox = ({ setLoginMode }) => {
  const router = useNavigate();
  const pageParam = useParams();
  const defU = getuserDef(pageParam);
  const [err, setErr] = useState("");
  // eslint-disable-next-line no-unused-vars
  const { userAuth, setUserAuth } = useContext(AuthContext);
  const [email, setEmail] = useState(defU.login);
  const [password, setPassword] = useState(defU.pass);
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
        <div className="mb-2">
          <h2>Login</h2>
        </div>
        <input
          value={email}
          type="email"
          placeholder="Email"
          id="email"
          onChange={(e) => {
            if (err) setErr("");
            setEmail(e.target.value);
          }}
        />
        <input
          value={password}
          onKeyDown={onKeyPress}
          type="password"
          id="password"
          placeholder="password"
          onChange={(e) => {
            if (err) setErr("");
            setPassword(e.target.value);
          }}
        />{" "}
        <div className={cl.err}>{err}</div>
        <Link className={cl.links} onClick={() => setLoginMode(3)}>
          Forgot My Password
        </Link>
        <p>
          <button type="submit" className={cl.btnlogin} onClick={login}>
            LOGIN
          </button>
        </p>
        <Link className={cl.links} onClick={() => setLoginMode(2)}>
          Create Your Account
        </Link>
      </div>{" "}
    </div>
  );
};

export default LoginBox;
