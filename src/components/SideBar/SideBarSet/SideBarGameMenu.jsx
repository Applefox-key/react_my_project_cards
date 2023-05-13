import React from "react";
import cl from "../SideBar.module.scss";
import { gameMenuArr } from "../../../utils/games";
import { useNavigate, useParams } from "react-router-dom";

const SideBarGameMenu = () => {
  const pageParam = useParams();
  const router = useNavigate();
  const gameMenu = gameMenuArr(
    pageParam,
    window.location.pathname.includes("pub")
  );
  return (
    <div className="mt-5">
      <h3>PLAY GAMES</h3>
      {gameMenu.map((item, i) =>
        item.href || item.onClick ? (
          <div
            className={cl["link-box"]}
            key={i}
            onClick={item.onClick ? item.onClick : () => router(item.href)}>
            {item.symb && item.symb}
            {item.name}
          </div>
        ) : (
          <div className="divider" key={i}></div>
        )
      )}
    </div>
  );
};
export default SideBarGameMenu;
