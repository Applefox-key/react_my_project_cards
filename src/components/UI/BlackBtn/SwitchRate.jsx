import React, { useRef, useState } from "react";
import cl from "./BackBtn.module.scss";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "animate.css";
import { useOutsideClick } from "../../../hooks/useOutSideClick";
import StarsSet from "./StarsSet";
import { IoFilter } from "react-icons/io5";

const SwitchRate = ({ filterRate, setFilterRate }) => {
  const [isShow, setIsShow] = useState(false);
  const [choosen, setChoosen] = useState(filterRate);
  const wrapRef = useRef(null);
  useOutsideClick(wrapRef, () => {
    if (!isShow) return;
    setIsShow(false);
    setChoosen(filterRate);
  });

  const changeRate = (el) => {
    setChoosen((prev) => {
      const newV = prev === null ? [] : [...prev];
      return newV.includes(el) ? newV.filter((it) => it !== el) : [...newV, el];
    });
  };

  const apply = (e) => {
    e.stopPropagation();
    setIsShow(false);

    setFilterRate(choosen.length ? [...choosen] : null);
  };
  const reset = (e) => {
    e.stopPropagation();

    setFilterRate(null);
    setChoosen(null);
    setIsShow(false);
  };

  return (
    <>
      <span className={cl.dv} />
      <div
        className={[cl.btnGame, "rate-dropdown"].join(" ")}
        size="lg"
        variant="dark"
        ref={wrapRef}
        onClick={() => {
          if (isShow) setChoosen(filterRate);
          setIsShow(!isShow);
        }}
        title="choode cards by rate">
        <IoFilter className={cl.svgGameMode} />

        <span className={cl.endlesTitle}>BY RATING</span>
        <SwitchTransition>
          <CSSTransition key={filterRate} timeout={200} classNames={"endl"}>
            <div className={[cl.rateM, cl.endlesName].join(" ")}>
              <StarsSet {...{ choosen }} />
            </div>
          </CSSTransition>
        </SwitchTransition>
        {isShow && (
          <div className="rate-list">
            <button className="w-100 mb-4" onClick={reset}>
              all cards
            </button>
            <div className={cl.rateP}>
              <StarsSet {...{ choosen, callback: changeRate }} />
            </div>

            <button onClick={apply} className="w-100 mt-4">
              apply
            </button>
          </div>
        )}
      </div>
      {/* )} */}
    </>
  );
};
export default SwitchRate;
