import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { MdOutlineModelTraining } from "react-icons/md";

import cl from "./GamesMenu.module.scss";

import { useOutsideClick } from "../../../hooks/useOutSideClick";
import { gameMenuArr } from "../../../utils/games";

const GamesMenu = ({
  isBtnForm = false,
  cardSet,
  isPlaylist = false,
  isVertical = false,
}) => {
  const [show, setShow] = useState(!isBtnForm);
  const [inProp, setInProp] = useState(!isBtnForm);
  const onClick = (e) => {
    e.stopPropagation();
    if (show) {
      setInProp(false);
    } else {
      setShow(true);
      setInProp(true);
    }
  };

  const onExited = () => {
    setShow(false); // Скрываем элемент после завершения анимации выхода
  };
  const router = useNavigate();
  const gameMenu = gameMenuArr(
    cardSet,
    window.location.pathname.includes("pub"),
    isPlaylist
  ).filter((el) => el.type !== "Divider");

  const classN = (() => {
    let classes = "";
    if (isBtnForm) classes = "body-after-btn";
    else classes = "games-menu-body";
    if (!isVertical) classes += "-horizontal";
    return cl[classes];
  })();
  const wrapRef = useRef(null);
  useOutsideClick(wrapRef, () => setInProp(false), isBtnForm);

  return (
    <div
      className={
        isVertical ? cl["games-menu-wrap-vert"] : cl["games-menu-wrap"]
      }>
      <div
        className={
          isVertical
            ? show
              ? cl["overflow-vert-show"]
              : cl["overflow-vert"]
            : ""
        }>
        {!(isBtnForm && !show) && (
          <CSSTransition
            in={inProp}
            appear
            onExited={onExited}
            timeout={{
              appear: 600,
              enter: 600,
              exit: 600,
            }}
            classNames="fadeG"
            unmountOnExit>
            <div className={classN}>
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
                  {item.symb} {isVertical ? item.name : ""}
                </div>
              ))}
            </div>
          </CSSTransition>
        )}
        {isBtnForm && (
          <>
            <button
              ref={wrapRef}
              className={
                inProp ? cl["games-menu-btn-show"] : cl["games-menu-btn"]
              }
              data-title={"Games"}
              onClick={onClick}>
              <MdOutlineModelTraining className={cl.ico} />
              Learn
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GamesMenu;
