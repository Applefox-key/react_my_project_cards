import React from "react";
import { useState } from "react";
import { useContext } from "react";
import BaseAPI from "../../../API/BaseAPI";
import { AuthContext } from "../../../context";
import cl from "./login.module.css";
import AnimatedBtn from "../../UI/AnimatedBtn/AnimatedBtn";
import { useNavigate, useParams } from "react-router-dom";
import { isEmailValid } from "../../../utils/validation";
import { usePopup } from "../../../hooks/usePopup";

const LoginBox = ({ setLoginMode }) => {
  const router = useNavigate();
  const pageParam = useParams();
  const [err, setErr] = useState("");
  // eslint-disable-next-line no-unused-vars
  const { userAuth, setUserAuth } = useContext(AuthContext);
  const [email, setEmail] = useState(pageParam.email ? pageParam.email : "");
  const [password, setPassword] = useState("");
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

  // const serverQuery = async () => {
  //   let response = await BaseAPI.login(email, password);
  // };

  return (
    <div className={cl.containerlogin}>
      <div
        className={
          cl["login-box"] + " " + cl["animated"] + " " + cl["fadeInUp"]
        }>
        {" "}
        <div className={cl["box-header"]}>
          <h2 className={cl.h2login}>Log In</h2>
        </div>
        <label htmlFor="username">Email</label>
        <br />
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
        <br />
        <input
          value={password}
          type="password"
          id="password"
          onChange={(e) => {
            if (err) setErr("");
            setPassword(e.target.value);
          }}
        />{" "}
        <br />
        <div className={cl.err}>{err}</div>
        <br />
        <div className="mb-2">
          <AnimatedBtn
            title="Create Your Account"
            onClick={() => setLoginMode(false)}
          />
        </div>
        <button type="submit" className={cl.btnlogin} onClick={login}>
          Sign In
        </button>
      </div>{" "}
    </div>
  );
};

export default LoginBox;
