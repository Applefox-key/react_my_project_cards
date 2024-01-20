import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BaseAPI from "../../API/BaseAPI";
import cl from "./mainNavbar.module.scss";
import { useAuth } from "../../hooks/useAuth";
import UserAvatar from "../users/Profile/UserAvatar";

const MyNavbar = () => {
  const router = useNavigate();
  const { userRoutes, userAuth, setUserAuth } = useAuth(true);
  const logout = () => {
    BaseAPI.logout();
    setUserAuth({ isAuth: false, role: null });
    router("/login");
  };

  return (
    <>
      <div className={cl.headerNav}>
        <h1>FlashMinds: </h1>
        {/* <span>MASTER YOUR KNOWLEDGE WITH FLASHCARDS</span> */}
        <span> Master Your Knowledge with Flashcards</span>
      </div>
      <div className={[cl.navWrap].join(" ")}>
        {userRoutes
          .filter((el) => el.nameNav)
          .map((item, i) => (
            <Link
              to={item.path}
              key={i}
              id={"path" + item.nameNav.trim()}
              className={
                window.location.pathname.includes(item.path) ? cl.active : ""
              }>
              {item.nameNav.toUpperCase()}
            </Link>
          ))}
        {userAuth.isAuth && (
          <div>
            <UserAvatar
              style={{ width: "30px", height: "30px", marginLeft: "-1rem" }}
            />{" "}
            <Link to={""} onClick={logout}>
              LOGOUT
            </Link>
            {/* <Button
              variant="outline-dark"
              size="lg"
              className={cl.logout}
              style={{ height: "3.65rem" }}
              onClick={logout}>
              LOGOUT
            </Button> */}
          </div>
        )}
      </div>
    </>
  );
};

export default MyNavbar;
