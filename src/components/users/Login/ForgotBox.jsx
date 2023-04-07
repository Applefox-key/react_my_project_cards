import React from "react";
import { useState } from "react";
import BaseAPI from "../../../API/BaseAPI";
import cl from "./login.module.scss";
import { Link, useParams } from "react-router-dom";
import { isEmailValid } from "../../../utils/validation";

const ForgotBox = ({ setLoginMode }) => {
  // const router = useNavigate();
  const pageParam = useParams();
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [email, setEmail] = useState(pageParam.email ? pageParam.email : "");

  const getToken = async (event) => {
    if (!isEmailValid(email)) {
      setErr("email is invalid");
      return;
    }

    try {
      await BaseAPI.sendMailResetToken(email);
      if (err) setErr("");
      setSuccess("please check you email");
    } catch (error) {
      alert(error);
      setErr(error.message);
    }
  };

  return (
    <div className={cl.containerlogin}>
      <div className={cl["login-box"]}>
        {" "}
        <div className={cl["box-header"]}>
          <h2 className={cl.h2login}>Password restore</h2>
        </div>{" "}
        <div className="mb-2">
          {" "}
          <Link className={cl.links} onClick={() => setLoginMode(1)}>
            Back to login form
          </Link>
        </div>
        <p
          style={{
            fontSize: "1.5rem",
            paddingLeft: "4rem",
            paddingRight: "4rem",
          }}>
          enter your email and click SUBMIT, you will receive an email with a
          link to change your password
        </p>
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
        />{" "}
        <br />
        <div className={cl.err}>{err}</div>
        <div className={cl.success}>{success}</div>
        <br />
        {!success && (
          <button type="submit" className={cl.btnlogin} onClick={getToken}>
            SUBMIT
          </button>
        )}
      </div>{" "}
    </div>
  );
};

export default ForgotBox;
