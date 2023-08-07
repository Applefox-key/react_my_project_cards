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

  const menu = (item, i, s = "") => {
    return (
      <div
        className={cl["link-box"]}
        key={i}
        onClick={item.onClick ? item.onClick : () => router(item.href)}>
        {s ? s : item.symb}
        {/* {item.symb && item.symb} */}
        {item.name}
      </div>
    );
  };

  const menuEl = (el, i) => {
    if (el.type === "Divider") return <div className="divider" key={i}></div>;
    if (el.type === "item") return menu(el, i);
    else return <>{el.items.map((item, j) => menu(item, j, el.symb))}</>;
  };
  return (
    <div className="mt-5">
      <h3>PLAY GAMES</h3>
      {gameMenu.map((item, i) => menuEl(item, i))}
    </div>
  );
};
export default SideBarGameMenu;
