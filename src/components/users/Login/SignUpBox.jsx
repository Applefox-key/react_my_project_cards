import React from "react";
import { useState } from "react";
import { useContext } from "react";
import BaseAPI from "../../../API/BaseAPI";
import { AuthContext } from "../../../context";
import { useNavigate, useParams } from "react-router-dom";
import cl from "./login.module.css";
import AnimatedBtn from "../../UI/AnimatedBtn/AnimatedBtn";
import { usePopup } from "../../../hooks/usePopup";
import { isEmailValid } from "../../../utils/validation";

const SignUpBox = ({ setLoginMode }) => {
  const router = useNavigate();
  const pageParam = useParams();

  // eslint-disable-next-line no-unused-vars
  const { userAuth, setUserAuth } = useContext(AuthContext);
  const [email, setEmail] = useState(pageParam.email ? pageParam.email : "");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const setPopup = usePopup();
  const [name, setName] = useState("");
  const newUser = async (data) => {
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
    let ok = await BaseAPI.createUser({
      name: name,
      email: email,
      password: password,
    });

    if (!ok.error) {
      router("/login/" + email);
    } else {
      setPopup.error(ok.error);
      setErr(ok.error);
    }
  };

  return (
    <div className={cl.containerlogin}>
      <div
        className={
          cl["login-box"] + " " + cl["animated"] + " " + cl["fadeInUp"]
        }>
        <div className={cl["box-header"]}>
          <h2 className={cl.h2login}>Register</h2>
        </div>
        <label htmlFor="username">Email</label>
        <br />
        <input
          style={{ borderColor: isEmailValid(email) ? "green" : "red" }}
          value={email}
          type="email"
          id="email"
          placeholder="name@example.com"
          onChange={(e) => {
            if (err) setErr("");
            setEmail(e.target.value);
          }}
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          style={{ borderColor: password ? "green" : "red" }}
          value={password}
          type="password"
          id="password"
          placeholder="password"
          onChange={(e) => {
            if (err) setErr("");
            setPassword(e.target.value);
          }}
        />
        <label htmlFor="username">Name</label>
        <br />
        <input
          value={name}
          type="string"
          id="username"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <br />

        <div className={cl.err}>{err}</div>
        <div className="mb-2">
          <AnimatedBtn
            title="Back to login form"
            onClick={() => setLoginMode(true)}
          />
        </div>
        <button type="submit" className={cl.btnlogin} onClick={newUser}>
          Сreate an account
        </button>
      </div>
    </div>
  );
};

export default SignUpBox;
