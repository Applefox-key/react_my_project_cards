import React, { useState } from "react";
import { gameMenuArr } from "../../../utils/games";
import { useNavigate } from "react-router-dom";

const PlayMenu = ({ collection, playlist = false, verticals = false }) => {
  const [showmenu, setShowmenu] = useState(false);

  const router = useNavigate();
  const gameMenu = gameMenuArr(
    collection,
    window.location.pathname.includes("pub"),
    playlist
  );

  const menu = (item, i, clName = "oneP") => {
    return (
      <div
        key={i}
        title={item.name}
        className={clName}
        onClick={
          item.type === "item" && item.onClick
            ? item.onClick
            : () => router(item.href)
        }>
        {item.symb}
      </div>
    );
  };
  const submenu = (item, i) => {
    return (
      <div key={i} title={item.name} className="oneP">
        {item.symb}
        <div className="sub">{item.items.map((el, j) => menu(el, j, ""))}</div>
      </div>
    );
  };
  const menuEl = (el, i) => {
    if (el.type === "Divider") return <></>;
    if (el.type === "menu") return submenu(el, i);
    else return menu(el, i);
  };
  return (
    <div
      className={"playMenubtn"}
      onClick={(e) => {
        e.stopPropagation();
        setShowmenu(!showmenu);
      }}>
      <p>PLAY</p>
      <div className={verticals ? "play-menu play-vert" : "play-menu"}>
        {gameMenu.map((item, i) => menuEl(item, i))}
      </div>{" "}
    </div>
  );
};

export default PlayMenu;
