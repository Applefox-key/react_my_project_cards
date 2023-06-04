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

  return (
    <div
      className={"playMenubtn"}
      onClick={(e) => {
        e.stopPropagation();
        setShowmenu(!showmenu);
      }}>
      <p>PLAY</p>
      <div className={verticals ? "play-menu play-vert" : "play-menu"}>
        {gameMenu.map(
          (item, i) =>
            item.name !== "Divider" && (
              <div
                key={i}
                title={item.name}
                className="oneP"
                onClick={item.onClick ? item.onClick : () => router(item.href)}>
                {item.symb}
              </div>
            )
        )}
      </div>{" "}
    </div>
  );
};

export default PlayMenu;
