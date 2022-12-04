import React from "react";
import { useNavigate } from "react-router-dom";
import BaseAPI from "../../API/BaseAPI";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import MyNavLink from "./MyNavLink";
import cl from "./MyNavbar.module.css";
import { useAuth } from "../../hooks/useAuth";
import UserAvatar from "../users/UserAvatar";
const MyNavbar = () => {
  const router = useNavigate();
  //get  elements with nameNav only
  const [routesArr, userAuth, setUserAuth] = useAuth(true);

  const logout = () => {
    BaseAPI.logout();
    setUserAuth({ isAuth: false, role: null });
    router("/login");
  };

  return (
    <div className={[cl.nav, "bg-light"].join(" ")}>
      <Nav activeKey="/about" className="justify-content-end pe-4 ">
        {routesArr
          .filter((el) => el.nameNav)
          .map((item, i) => (
            <Nav.Item key={i}>
              <MyNavLink root={item} />
            </Nav.Item>
          ))}

        {userAuth.isAuth && (
          <div>
            <UserAvatar style={{ width: "30px", height: "30px" }} />
            <Button variant="outline-dark" size="lg" onClick={logout}>
              Logout
            </Button>
          </div>
        )}
      </Nav>
    </div>
  );
};

export default MyNavbar;
