import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BaseAPI from "../../../API/BaseAPI";
import { usePopup } from "../../../hooks/usePopup";
import cl from "./login.module.scss";

const ForgotPassword = () => {
  const { resetToken } = useParams();
  const setPopup = usePopup();
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [err, setErr] = useState();

  useEffect(() => {
    const checkToken = async (token) => {
      try {
        const res = await BaseAPI.CheckResetToken(token);
        return res;
      } catch (error) {
        setErr("400");
      }
    };

    checkToken(resetToken);
  }, [resetToken]);
  const router = useNavigate();

  const setnewpass = async () => {
    try {
      await BaseAPI.setNewPassword(password1, resetToken);
      setPopup.success("password was changed");
      router("/login");
    } catch (error) {
      setErr(error);
    }
  };

  return (
    <div className="m-auto">
      {err === "400" ? (
        <h1>THE LINK HAS EXPIRED</h1>
      ) : (
        <div
          className={cl["login-box"]}
          style={{
            marginRight: "35%",
          }}>
          <div className={cl["box-header"]}>
            <h2 className={cl.h2login}>PLEASE enter new password</h2>
          </div>
          <br />
          <br />
          <label htmlFor="password1">Password</label>
          <br />
          <input
            value={password1}
            type="password"
            placeholder="password"
            id="password1"
            onChange={(e) => {
              if (err) setErr("");
              setPassword1(e.target.value);
            }}
          />{" "}
          <input
            value={password2}
            type="password"
            id="password2"
            placeholder="password's confirm"
            onChange={(e) => {
              if (err) setErr("");
              setPassword2(e.target.value);
            }}
          />{" "}
          <div className={cl.err}>{err}</div>
          <br />
          <br />
          <button type="submit" className={cl.btnlogin} onClick={setnewpass}>
            Set new password
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
