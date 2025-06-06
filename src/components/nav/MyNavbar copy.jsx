import React from "react";
import { Link, useNavigate } from "react-router-dom";

import cl from "./mainNavbar.module.scss";

import ThemeSwitch from "../UI/tgb/ThemeSwitch";
import FilterLS from "../UI/MyFilter/FilterLS";
import MyNavUserImg from "./MyNavUserImg";
import Popup from "../UI/popup/Popup";
import NavMenu from "./NavMenu";

import { useAuth } from "../../hooks/useAuth";
import BaseAPI from "../../API/BaseAPI";

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
    window.location.pathname.includes("about");
  const isHideNav =
    window.location.pathname.includes("/play_") ||
    window.location.pathname.includes("/print/") ||
    window.location.pathname.includes("/card/") ||
    window.location.pathname.includes("/edit/");
  const isPlaylist = window.location.pathname.includes("/playlist");

  return (
    <div className={[cl.topNav]}>
      {<ThemeSwitch isPlay={isHideNav} />}

      {!isHideNav && (
        <>
          <div className={headerBig ? cl.headerNav : cl.headerNavSmall}>
            <h1>FlashMinds </h1>
            {headerBig && <span> Master Your Knowledge with Flashcards</span>}
          </div>
          <div className={[cl.navWrap].join(" ")}>
            <Popup />
            <NavMenu userRoutes={userRoutes} userAuth={userAuth} />

            {userAuth.isAuth ? (
              <div className="d-flex">
                {!isPlaylist && <FilterLS filter="" setFilter={() => {}} />}
                <MyNavUserImg logout={logout} />{" "}
              </div>
            ) : (
              <Link
                to={"./login"}
                id={"path./login"}
                className={
                  window.location.pathname.includes("login") ? cl.active : ""
                }>
                LOGIN
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MyNavbar;
