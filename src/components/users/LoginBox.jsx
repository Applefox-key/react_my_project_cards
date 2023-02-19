import React from "react";
import { useState } from "react";
import { useContext } from "react";
import BaseAPI from "../../API/BaseAPI";
import { AuthContext } from "../../context";
import cl from "./login.module.css";
import AnimatedBtn from "../UI/AnimatedBtn/AnimatedBtn";
import { useNavigate, useParams } from "react-router-dom";

const LoginBox = ({ setLoginMode }) => {
  const router = useNavigate();
  const pageParam = useParams();

  // eslint-disable-next-line no-unused-vars
  const { userAuth, setUserAuth } = useContext(AuthContext);
  const [email, setEmail] = useState(pageParam.email ? pageParam.email : "");
  const [password, setPassword] = useState("");

  const login = async (event) => {
    try {
      let response = await BaseAPI.login(email, password);
      setUserAuth({ isAuth: true, role: response.role });
      router(`/manager`);
    } catch (error) {
      alert(error);
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
        <label for="username">Email</label>
        <br />
        <input
          value={email}
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label for="password">Password</label>
        <br />
        <input
          value={password}
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <div className="mb-2">
          <AnimatedBtn
            title="Create Your Account"
            onClick={() => setLoginMode(false)}
          />
        </div>
        {/* <Link className=" text-primary fs-5" to="/signup">
          Create Your Account
        </Link>{" "} */}
        <button type="submit" className={cl.btnlogin} onClick={login}>
          Sign In
        </button>
      </div>{" "}
    </div>
  );
};

export default LoginBox;
