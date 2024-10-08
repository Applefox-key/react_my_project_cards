import React, { useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import cl from "./login.module.scss";

import { isEmailValid } from "../../../utils/validation";
import { usePopup } from "../../../hooks/usePopup";
import { AuthContext } from "../../../context";
import BaseAPI from "../../../API/BaseAPI";

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
      setPopup.success("Please log in");
      router("/login/" + email);
      setLoginMode(1);
    } else {
      setPopup.error(ok.error);
      setErr(ok.error);
    }
  };

  return (
    <div className={cl.containerlogin}>
      <div className={cl["login-box"]}>
        <div className="mb-2">
          <p>
            <h2>Register</h2>
          </p>
        </div>
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

        <input
          value={name}
          type="string"
          id="username"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <div className={cl.err}>{err}</div>
        <button type="submit" className={cl.btnlogin} onClick={newUser}>
          Сreate an account
        </button>
        <Link className={cl.links} onClick={() => setLoginMode(1)}>
          Back to login form
        </Link>
      </div>
    </div>
  );
};

export default SignUpBox;
