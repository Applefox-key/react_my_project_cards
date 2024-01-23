import React, { useState } from "react";
import PlayMenu from "./PlayMenu";
import cl from "./PlayMenu.module.scss";
import { MdOutlineModelTraining } from "react-icons/md";

const BtnPlayMenu = ({ collection, verticals = true, ...props }) => {
  const [show, setShow] = useState(false);
  const onClick = () => {
    setShow(!show);
  };
  return (
    <div className="btnGames-wrap">
      <button
        className={show ? cl.btnShow : cl.btnP}
        data-title={"Games"}
        onClick={onClick}>
        <MdOutlineModelTraining />
      </button>

      {show && (
        <div className={"playmenu"}>
          <PlayMenu collection={collection} verticals={verticals} {...props} />
        </div>
      )}
    </div>
  );
};

export default BtnPlayMenu;
