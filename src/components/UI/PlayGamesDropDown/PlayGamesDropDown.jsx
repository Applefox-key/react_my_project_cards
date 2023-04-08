import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "../../../styles/collectMenu.scss";
import { gameMenuArrPriv, gameMenuArrPub } from "../../../utils/games";

const PlayGamesDropDown = ({ isPublic, dis, ...props }) => {
  const router = useNavigate();
  const pageParam = useParams();
  const gameMenu = isPublic
    ? gameMenuArrPub(pageParam)
    : gameMenuArrPriv(pageParam);
  return (
    <div className="attension-wrap">
      <div className="attension">🏀</div>
      <DropdownButton
        style={{ fontSize: "3rem" }}
        disabled={dis}
        size="lg"
        variant="light"
        className="menuBtn"
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
