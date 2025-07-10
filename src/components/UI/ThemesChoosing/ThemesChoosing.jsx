import React, { useRef, useState } from "react";
import cl from "./ThemesChoosing.module.scss";
import ThemesChoosingBody from "./ThemesChoosingBody";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RiArrowDropDownFill } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
const ThemesChoosing = ({ callback }) => {
  const [show, setShow] = useState(false);
  const ref = useRef();
  const close = () => {
    setShow(false);
  };
  return (
    <div ref={ref} className={cl.wrapBox}>
      <div
        className={cl.btn}
        onClick={(e) => {
          e.stopPropagation();
          setShow(!show);
        }}>
        {/* <BiDotsVerticalRounded className={!show ? cl.dotsA : cl.dots} /> */}
        <BsThreeDots />
        {/* <RiArrowDropDownFill className={!show ? "rotate" : ""} /> */}
      </div>
      {show && (
        <ThemesChoosingBody refw={ref} close={close} callback={callback} />
      )}
    </div>
  );
};

export default ThemesChoosing;
