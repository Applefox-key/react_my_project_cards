import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import BaseAPI from "../../API/BaseAPI";
import cl from "./mainNavbar.module.scss";
import { useAuth } from "../../hooks/useAuth";
import Popup from "../UI/popup/Popup";
import ThemeSwitch from "../UI/tgb/ThemeSwitch";
import MyNavSubmenu from "./MyNavSubmenu";
import MyNavUserImg from "./MyNavUserImg";

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

  const navArr = useMemo(
    () => {
      const newArr = [];
      let gr = "";
      //
      userRoutes.forEach((element) => {
        if (element.nameNav)
          if (element.hasOwnProperty("group") && element.group) {
            if (gr !== element.group) {
              newArr.push({ groupMenu: [element], title: element.group });
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
    <>
      {<ThemeSwitch isPlay={isPlay} />}
      {!isPlay && (
        <>
          <div className={headerBig ? cl.headerNav : cl.headerNavSmall}>
            <h1>FlashMinds </h1>
            {headerBig && <span> Master Your Knowledge with Flashcards</span>}
          </div>
          <div className={[cl.navWrap].join(" ")}>
            <Popup />

            <div className="d-flex">
              {navArr.map((item, i) =>
                item.hasOwnProperty("groupMenu") ? (
                  <MyNavSubmenu
                    navArr={item.groupMenu}
                    group={item.title.toUpperCase()}
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

            {userAuth.isAuth && (
              <div>
                <MyNavUserImg logout={logout} />{" "}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default MyNavbar;
