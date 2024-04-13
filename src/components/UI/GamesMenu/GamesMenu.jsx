import React, { useState } from "react";
import { gameMenuArr } from "../../../utils/games";
import { useNavigate } from "react-router-dom";
import cl from "./GamesMenu.module.scss";
import { MdOutlineModelTraining } from "react-icons/md";
// isBtnForm = false,
// cardSet,
// isPlaylist = false,
// isVertical = false,
// isDark = false,
const GamesMenu = ({
  isBtnForm,
  cardSet,
  isPlaylist = false,
  isVertical = false,
  isDark,
  // small = false,true
}) => {
  const [show, setShow] = useState(!isBtnForm);
  const onClick = (e) => {
    e.stopPropagation();
    setShow(!show);
  };
  const router = useNavigate();
  const gameMenu = gameMenuArr(
    cardSet,
    window.location.pathname.includes("pub"),
    isPlaylist
  ).filter((el) => el.type !== "Divider");

  const classN = () => {
    let classes = "";
    if (isBtnForm) classes = "body-after-btn";
    else classes = "games-menu-body";

    if (!isVertical) classes += "-horizontal";
    return cl[classes];
  };

  return (
    <div className={cl["games-menu-wrap"]}>
      {isBtnForm && (
        <button
          className={show ? cl["games-menu-btn-show"] : cl["games-menu-btn"]}
          data-title={"Games"}
          onClick={onClick}>
          <MdOutlineModelTraining />
        </button>
      )}

      {!(!show && isBtnForm) && (
        <>
          <div className={classN()}>
            {gameMenu.map((item, i) => (
              <div
                key={i}
                title={item.name}
                className={cl["games-menu-item"]}
                onClick={
                  item.type === "item" && item.onClick
                    ? item.onClick
                    : (e) => {
                        e.stopPropagation();
                        router(item.href);
                      }
                }>
                {item.symb}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GamesMenu;
