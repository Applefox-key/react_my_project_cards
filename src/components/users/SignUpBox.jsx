import React from "react";
import { useState } from "react";
import { useContext } from "react";
import BaseAPI from "../../API/BaseAPI";
import { AuthContext } from "../../context";
import { useNavigate, useParams } from "react-router-dom";
import cl from "./login.module.css";
import AnimatedBtn from "../UI/AnimatedBtn/AnimatedBtn";

const SignUpBox = ({ setLoginMode }) => {
  const router = useNavigate();
  const pageParam = useParams();

  const isEmailValid = (value) => {
    const EMAIL_REGEXP =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return EMAIL_REGEXP.test(value);
  };
  // eslint-disable-next-line no-unused-vars
  const { userAuth, setUserAuth } = useContext(AuthContext);
  const [email, setEmail] = useState(pageParam.email ? pageParam.email : "");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const newUser = (data) => {
    if (!isEmailValid(email)) return;
    if (!password) return;
    let ok = BaseAPI.createUser({
      name: name,
      email: email,
      password: password,
    });
    if (!ok.error) {
      router("/login/" + data.email);
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

        <label for="username">Email</label>
        <br />

        <input
          style={{ borderColor: isEmailValid(email) ? "green" : "red" }}
          value={email}
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <label for="password">Password</label>
        <br />
        <input
          style={{ borderColor: password ? "green" : "red" }}
          value={password}
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label for="username">Name</label>
        <br />
        <input
          value={name}
          type="string"
          id="username"
          onChange={(e) => setName(e.target.value)}
        />

        <br />
        <div className="mb-2">
          <AnimatedBtn
            title="Back to login form"
            onClick={() => setLoginMode(true)}
          />
        </div>
        <button type="submit" className={cl.btnlogin} onClick={newUser}>
          Greate an account
        </button>
      </div>
    </div>
  );
};

export default SignUpBox;
