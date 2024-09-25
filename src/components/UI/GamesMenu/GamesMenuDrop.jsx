import React, { useState } from "react";
import cl from "./GamesMenu.module.scss";
import { gameMenuArr } from "../../../utils/games";
import { useNavigate } from "react-router-dom";
import { MdOutlineModelTraining } from "react-icons/md";
import { useOutsideClick } from "../../../hooks/useOutSideClick";

const GamesMenuDrop = ({ cardSet, isPlaylist = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const gameMenu = gameMenuArr(
    cardSet,
    window.location.pathname.includes("pub"),
    isPlaylist
  ).filter((el) => el.type !== "Divider");

  useOutsideClick("learnBtn", () => setIsOpen(false));

  const router = useNavigate();
  return (
    <div className={cl.dropdown}>
      <button
        className={cl["dropdown-toggle"]}
        onClick={toggleMenu}
        id="learnBtn">
        <MdOutlineModelTraining /> Learn
      </button>
      {isOpen && gameMenu && (
        <ul className={cl["dropdown-menu"]}>
          {gameMenu.map((item, i) => (
            <li
              key={i}
              title={item.name}
              //   className={cl["games-menu-item"]}
              onClick={
                item.type === "item" && item.onClick
                  ? item.onClick
                  : (e) => {
                      e.stopPropagation();
                      router(item.href);
                    }
              }>
              {item.symb} {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GamesMenuDrop;
