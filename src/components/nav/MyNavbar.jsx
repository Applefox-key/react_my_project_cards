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
import { AiOutlineLogin } from "react-icons/ai";
import { useStickyTop } from "../../hooks/useStickyTop";

const MyNavbar = () => {
  const router = useNavigate();
  const { userRoutes, userAuth, setUserAuth } = useAuth(true);
  const logout = () => {
    BaseAPI.logout();
    setUserAuth({ isAuth: false, role: null });
    router("/login");
  };

  const isHideNav =
    window.location.pathname.includes("/play_") ||
    window.location.pathname.includes("/print/") ||
    window.location.pathname.includes("/card/") ||
    window.location.pathname.includes("/edit/");
  const isPlaylist = window.location.pathname.includes("/playlist");
  useStickyTop();
  return (
    <div className={[cl.topNav]}>
      <ThemeSwitch isPlay={isHideNav} />
      {!isHideNav && (
        <>
          <div className={cl.line1}>
            <div className={cl.headerLogo}>
              <Link to="/home">{<h1>FlashMinds </h1>}</Link>
            </div>

            {userAuth.isAuth ? (
              <MyNavUserImg logout={logout} />
            ) : (
              <Link
                to={"./login"}
                id={"iconlogin"}
                className={
                  window.location.pathname.includes("login") ? cl.active : ""
                }>
                LOGIN <AiOutlineLogin />
              </Link>
            )}
          </div>

          <div className={[cl.navWrap].join(" ")}>
            <Popup />
            <NavMenu userRoutes={userRoutes} userAuth={userAuth} />
            {/* className={cl.leftnav} */}
            <div className={cl.rightB}>
              <Link
                to={"./about"}
                className={
                  window.location.pathname.includes("about") ? cl.active : ""
                }>
                FAQ
              </Link>{" "}
              {userAuth.isAuth && !isPlaylist && (
                <FilterLS filter="" setFilter={() => {}} />
              )}
            </div>
          </div>
        </>
      )}
      {/* {isHideNav && <ThemeSwitch isPlay={isHideNav} />} */}
    </div>
  );
};

export default MyNavbar;
