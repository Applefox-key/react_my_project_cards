import React from "react";
import { Route, Routes } from "react-router-dom";
import MyNavbar from "./nav/MyNavbar";
import Popup from "./UI/popup/Popup";
import { useAuth } from "../hooks/useAuth";

const AppRouter = () => {
  const routesArr = useAuth();

  return (
    <div>
      <MyNavbar />
      <div style={{ marginTop: "2.5rem" }} />
      <Popup />
      <div className="color_container"></div>
      <div className="main_page">
        <Routes>
          {routesArr.map((item, i) => (
            <Route path={item.path} element={item.element} key={i} />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default AppRouter;
