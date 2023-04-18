import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BaseAPI from "../../API/BaseAPI";
import Button from "react-bootstrap/Button";

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
    <div className={[cl.navWrap].join(" ")}>
      {userRoutes
        .filter((el) => el.nameNav)
        .map((item, i) => (
          <Link
            to={item.path}
            key={i}
            className={
              window.location.pathname.includes(item.path) ? cl.active : ""
            }>
            {item.nameNav}
          </Link>
        ))}
      {userAuth.isAuth && (
        <div>
          <UserAvatar
            style={{ width: "30px", height: "30px", marginLeft: "-1rem" }}
          />
          <Button
            variant="outline-dark"
            size="lg"
            className={cl.logout}
            style={{ height: "3.65rem" }}
            onClick={logout}>
            Logout
          </Button>
        </div>
      )}
      {/* <Nav activeKey="/about" className="justify-content-end pe-4 ">
        {routesArr
          .filter((el) => el.nameNav)
          .map((item, i) => (
            <Nav.Item key={i}>
              <MyNavLink root={item} />
            </Nav.Item>
          ))}

        {userAuth.isAuth && (
          <div>
            <UserAvatar
              style={{ width: "30px", height: "30px", marginLeft: "-1rem" }}
            />
            <Button
              variant="outline-dark"
              size="lg"
              className={cl.logout}
              style={{ height: "3.65rem" }}
              onClick={logout}>
              Logout
            </Button>
          </div>
        )}
      </Nav> */}
    </div>
  );
};

export default MyNavbar;
