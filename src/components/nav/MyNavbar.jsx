import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import BaseAPI from "../../API/BaseAPI";
import cl from "./mainNavbar.module.scss";
import { useAuth } from "../../hooks/useAuth";
import Popup from "../UI/popup/Popup";
import ThemeSwitch from "../UI/tgb/ThemeSwitch";
import MyNavSubmenu from "./MyNavSubmenu";
import MyNavUserImg from "./MyNavUserImg";
import FilterLS from "../UI/MyFilter/FilterLS";

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

  const navArr = useMemo(
    () => {
      const newArr = [];
      let gr = "";
      //
      userRoutes.forEach((element) => {
        if (element.nameNav)
          if (element.hasOwnProperty("group") && element.group) {
            if (gr !== element.group) {
              newArr.push({
                groupMenu: [element],
                title: element.group,
                groupPath: element.groupPath,
              });
              gr = element.group;
            } else newArr[newArr.length - 1].groupMenu.push(element);
          } else {
            newArr.push(element);
            gr = "";
          }
      });

      return newArr;
    }, // eslint-disable-next-line
    [userAuth]
  );

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

            <div className={cl.leftnav}>
              {navArr.map((item, i) =>
                item.hasOwnProperty("groupMenu") ? (
                  <MyNavSubmenu
                    key={i}
                    navArr={item.groupMenu}
                    group={item.title.toUpperCase()}
                    groupPath={item.groupPath}
                  />
                ) : (
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
                )
              )}
            </div>

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
