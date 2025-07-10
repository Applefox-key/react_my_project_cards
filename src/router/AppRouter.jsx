import React from "react";
import { Route, Routes } from "react-router-dom";
import MyNavbar from "../components/nav/MyNavbar";
import { useAuth } from "../hooks/useAuth";

const AppRouter = () => {
  const routesArr = useAuth();

  return (
    <>
      <MyNavbar />
      <div
        className={
          window.location.pathname.includes("/play_")
            ? "main_page mpGame"
            : "main_page"
        }>
        <Routes>
          {routesArr.map((item, i) => (
            <Route path={item.path} element={item.element} key={i} />
          ))}
        </Routes>
      </div>
    </>
  );
};

export default AppRouter;
