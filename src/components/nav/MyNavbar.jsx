import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BaseAPI from "../../API/BaseAPI";
import cl from "./mainNavbar.module.scss";
import { useAuth } from "../../hooks/useAuth";
import UserAvatar from "../users/Profile/UserAvatar";
import Popup from "../UI/popup/Popup";

const MyNavbar = () => {
  const router = useNavigate();
  const { userRoutes, userAuth, setUserAuth } = useAuth(true);
  const logout = () => {
    BaseAPI.logout();
    setUserAuth({ isAuth: false, role: null });
    router("/login");
  };
  const headerBig =
    window.location.pathname.includes("home") ||
    window.location.pathname.includes("about") ||
    window.location.pathname.includes("login");
  const isPlay = window.location.pathname.includes("/play_");
  return (
    <>
      {!isPlay && (
        <>
          <div className={headerBig ? cl.headerNav : cl.headerNavSmall}>
            <h1>FlashMinds </h1>
            {headerBig && <span> Master Your Knowledge with Flashcards</span>}
          </div>
          <div className={[cl.navWrap].join(" ")}>
            {" "}
            <Popup />
            {userRoutes
              .filter((el) => el.nameNav)
              .map((item, i) => (
                <Link
                  to={item.path}
                  key={i}
                  id={"path" + item.nameNav.trim()}
                  className={
                    window.location.pathname.includes(item.path)
                      ? cl.active
                      : ""
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
      )}
    </>
  );
};

export default MyNavbar;
