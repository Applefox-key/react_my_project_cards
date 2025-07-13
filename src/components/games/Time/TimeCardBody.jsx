import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";

import cl from "../Games.module.scss";

import OneCardG from "../OneCardG";
import MyInputGroup from "../../UI/MyInput/MyInputGroup";
import BackBtn from "../../UI/BlackBtn/BackBtn";
import Result from "../../UI/CARDS/Result";
import SwitchRate from "../../UI/BlackBtn/SwitchRate";
import GameScoreItem from "../GameScoreItem";
import { useCardTimer } from "../../../hooks/useCardTimer";

const TimeCardBody = ({ items, filterRate, setFilterRate }) => {
  const [oneDelay, setOneDelay] = useState(1.5);
  const [num, setNum] = useState(0);
  const [flip, setFlip] = useState(false);
  const [anim, setShowAnim] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { start, clearAllTimeouts } = useCardTimer(
    items,
    oneDelay,
    num,
    setNum,
    setFlip,
    setShowAnim
  );
  const pause = () => {
    clearAllTimeouts();
    setIsPaused(true);
  };

  const resume = () => {
    setIsPaused(false);
    start();
  };
  const handleStartPauseClick = () => {
    if (num === 0) start();
    else isPaused ? resume() : pause();
  };
  const isCards = !!items?.length;
  const isFinished = num === items.length && isCards;
  return (
    <>
      <div className="gameTitle">Cards gallery with timer</div>
      <div
        className={
          "menuField " +
          (!isFinished && isCards ? "d-flex w-100 justify-content-between" : "")
        }>
        <div className="d-flex">
          <BackBtn /> <SwitchRate {...{ filterRate, setFilterRate }} />
        </div>
        {!isFinished && isCards && (
          <>
            <div className={[cl.timemenu].join(" ")}>
              <MyInputGroup
                size="lg"
                label="DELAY IN SEC"
                value={oneDelay}
                type={"Number"}
                classgroup="mb-0"
                step={0.5}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (value > 0) setOneDelay(value);
                }}
              />
              <Button
                size="lg"
                className={cl.startP}
                onClick={handleStartPauseClick}
                disabled={isFinished || flip}
                variant={num === 0 || isPaused ? "success" : "warning"}>
                {num === 0 || isPaused ? "START" : "PAUSE"}
              </Button>
            </div>
            <GameScoreItem
              value={items && num + 1 + "/" + items.length}
              lable="Cards"
              bg="oneScoreItem"
            />
          </>
        )}
      </div>
      {!isFinished && isCards ? (
        <div className="m-auto ">
          <OneCardG noSound anim={anim} item={items[num]} flip={flip} />
        </div>
      ) : !isCards ? (
        <Result text="Oops! No cards match the selected options" noAgainBtn />
      ) : (
        <Result text="HOPE YOU DID WELL!" />
      )}
    </>
  );
};

export default TimeCardBody;
