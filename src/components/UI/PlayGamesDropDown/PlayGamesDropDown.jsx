import React from "react";

import { useParams } from "react-router-dom";
import "../../../styles/collectMenu.scss";
import { gameMenuArr } from "../../../utils/games";
import DropDownMenu from "../MyDropDownBtn/DropDownMenu";

const PlayGamesDropDown = ({ isPublic, dis, ...props }) => {
  const pageParam = useParams();
  const gameMenu = gameMenuArr(
    pageParam,
    window.location.pathname.includes("pub")
  );

  return (
    <div className="attension-wrap">
      <div className="attension">🏀</div>
      <DropDownMenu className="menuBtn" arr={gameMenu} title="PLAY GAMES" />
    </div>
  );
};

export default PlayGamesDropDown;
