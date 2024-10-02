import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import OneCardG from "../OneCardG";
import MyInputGroup from "../../UI/MyInput/MyInputGroup";
import cl from "../Games.module.scss";
import BackBtn from "../../UI/BlackBtn/BackBtn";
import GameCountBage from "../GameCountBage";
import Result from "../../UI/CARDS/Result";

const TimeCardBody = ({ items }) => {
  const [oneDelay, setOneDelay] = useState(1.5);
  const [num, setNum] = useState(0);
  const [flip, setFlip] = useState(false);
  const [anim, setShowAnim] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const timeouts = useRef([]);
  const clearAllTimeouts = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  };
  const start = () => {
    clearAllTimeouts();
    for (let i = num; i < items.length; i++) {
      const flipTimeout = setTimeout(() => {
        setFlip(true);
      }, 1100 * oneDelay * ((i - num) * 2 + 1));

      const animTimeout =
        i + 1 < items.length
          ? setTimeout(() => {
              setShowAnim(i % 2 === 0);
              setFlip(false);
              setNum(i + 1);
            }, 1100 * oneDelay * ((i - num) * 2 + 2))
          : "";
      timeouts.current.push(flipTimeout, animTimeout);
      if (i + 1 === items.length) {
        const finishTimeout = setTimeout(() => {
          setNum(i + 1);
        }, 1100 * oneDelay * ((i - num) * 2 + 2));
        timeouts.current.push(finishTimeout);
      }
    }
  };
  const pause = () => {
    clearAllTimeouts();
    setIsPaused(true);
  };

  const resume = () => {
    setIsPaused(false);
    start();
  };
  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, []);
  return (
    <>
      {items.length === num ? (
        <>
          <div className="menuField d-flex w-100 justify-content-center">
            <BackBtn />
          </div>
          <Result text="HOPE YOU DID WELL!" />
        </>
      ) : (
        <>
          <div className="menuField d-flex w-100 justify-content-between">
            <BackBtn />
            <div className={cl.timemenu}>
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
                onClick={num === 0 ? start : isPaused ? resume : pause}
                disabled={num === items.length || flip}
                variant={num === 0 || isPaused ? "success" : "warning"}>
                {num === 0 || isPaused ? "START" : "PAUSE"}
              </Button>
            </div>
            <GameCountBage
              value={items && num + 1 + "/" + items.length}
              bg="warning"
              text="dark"
            />
          </div>
          <div className="m-auto ">
            <OneCardG anim={anim} item={items[num]} flip={flip} />
          </div>
        </>
      )}
    </>
  );
};

export default TimeCardBody;
