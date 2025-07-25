import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineModelTraining } from "react-icons/md";

import cl from "./GamesMenu.module.scss";

import { useOutsideClick } from "../../../hooks/useOutSideClick";
import { gameMenuArr } from "../../../utils/games";
import { IoBulbOutline } from "react-icons/io5";

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
  const wrapRef = useRef(null);
  useOutsideClick(wrapRef, () => setIsOpen(false));

  const router = useNavigate();
  return (
    <div className={cl.dropdown}>
      <button
        className={cl["dropdown-toggle"]}
        onClick={toggleMenu}
        ref={wrapRef}>
        {/* <MdOutlineModelTraining />  */}
        <IoBulbOutline />
        Learn
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
