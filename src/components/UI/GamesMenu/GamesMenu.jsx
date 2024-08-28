import React, { useState } from "react";
import { gameMenuArr } from "../../../utils/games";
import { useNavigate } from "react-router-dom";
import cl from "./GamesMenu.module.scss";
import { MdOutlineModelTraining } from "react-icons/md";
import { CSSTransition } from "react-transition-group";

const GamesMenu = ({
  isBtnForm,
  cardSet,
  isPlaylist = false,
  isVertical = false,
}) => {
  const [show, setShow] = useState(!isBtnForm);
  const [inProp, setInProp] = useState(true);
  // const onClick = (e) => {
  //   e.stopPropagation();
  //   setShow(!show);
  // };

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

  return (
    <div
      className={
        isVertical ? cl["games-menu-wrap-vert"] : cl["games-menu-wrap"]
      }>
      <div className={isVertical ? cl["overflow-vert"] : ""}>
        {!(!show && isBtnForm) && (
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
                  {item.symb}
                </div>
              ))}
            </div>
          </CSSTransition>
        )}
        {isBtnForm && (
          <button
            className={
              inProp ? cl["games-menu-btn-show"] : cl["games-menu-btn"]
            }
            data-title={"Games"}
            onClick={onClick}>
            <MdOutlineModelTraining />
          </button>
        )}
      </div>
    </div>
  );
};

export default GamesMenu;
