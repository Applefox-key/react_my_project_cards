import React, { useEffect, useState } from "react";
import { useGame } from "../../../hooks/useGame";
import MySpinner from "../../UI/MySpinner";
import OneCardG from "./OneCardG";
import { shuffle } from "../../../utils/arraysFunc";
import BackBtn from "../../UI/BackBtn/BackBtn";
import { CSSTransition } from "react-transition-group";
import { usePopup } from "../../../hooks/usePopup";
import cl from "../../UI/CARDS/MyCard.module.css";
const CardsGallery = () => {
  const [items, setItems] = useState();
  const [direction, setDirection] = useState(true);
  const [itemNum, setItemNum] = useState(0);
  const [anim, setShowAnim] = useState(false);
  const setPopup = usePopup();
  const [getContent, isLoading, error] = useGame(setItems, shuffle);

  useEffect(() => {
    getContent();
    if (error) setPopup.error(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const next = () => {
    if (!direction) setDirection(true);
    setShowAnim(!anim);
    setItemNum(Math.min(itemNum + 1, items.length - 1));
  };

  const prew = () => {
    if (direction) setDirection(false);
    setShowAnim(!anim);
    setItemNum(Math.max(itemNum - 1, 0));
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <BackBtn size="lg" />
      {!isLoading && items ? (
        <CSSTransition appear={true} in={true} timeout={500} classNames="game">
          <div>
            <p>{items && itemNum + 1 + "/" + items.length}</p>

            <div className="mt-5 d-flex justify-content-center">
              {/* <Button variant="primary" onClick={prew} disabled={itemNum === 0}>
                {"❰"}
              </Button>{" "} */}
              <button
                className={cl.arrowBtn}
                onClick={prew}
                disabled={itemNum === 0}>
                {"❰"}
              </button>{" "}
              <div
                className="d-flex   justify-content-center"
                // style={{ width: "100%" }}
              >
                <OneCardG
                  anim={anim}
                  direction={direction}
                  item={items[itemNum]}
                />
              </div>
              <button
                className={cl.arrowBtn}
                // variant="primary"
                onClick={next}
                disabled={items.length - 1 === itemNum}>
                {"❱"}
              </button>
            </div>
          </div>
        </CSSTransition>
      ) : (
        <MySpinner />
      )}
    </div>
  );
};

export default CardsGallery;
