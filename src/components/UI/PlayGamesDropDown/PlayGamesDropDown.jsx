import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "../../../styles/collectMenu.scss";
import { gameMenuArr } from "../../../utils/games";

const PlayGamesDropDown = ({ isPublic, dis, ...props }) => {
  const router = useNavigate();
  const pageParam = useParams();
  const gameMenu = gameMenuArr(
    pageParam,
    window.location.pathname.includes("pub")
  );

  return (
    <div className="attension-wrap">
      <div className="attension">🏀</div>
      <DropdownButton
        style={{ fontSize: "3rem" }}
        disabled={dis}
        size="lg"
        variant="light"
        title="PLAY GAMES">
        {gameMenu.map((item, i) =>
          item.href || item.onClick ? (
            <Dropdown.Item
              style={{ fontSize: "1.5rem" }}
              key={i}
              onClick={item.onClick ? item.onClick : () => router(item.href)}>
              {item.name}
            </Dropdown.Item>
          ) : (
            <Dropdown.Divider key={i} />
          )
        )}
      </DropdownButton>
    </div>
  );
};

export default PlayGamesDropDown;
