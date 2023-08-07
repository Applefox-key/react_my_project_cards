import React from "react";
import cl from "./MyCard.module.scss";
import "./MyCard.module.scss";
import { mainAndImg } from "../../../utils/cardFragment";

const MyCardStatic = ({ item, mode }) => {
  return (
    <div className={cl.container_gallery}>
      <div className={cl["card-container"]}>
        <button className={cl["card-button"]}>
          <div className={cl["card-front"]}>
            {mainAndImg("front", 0, item, cl)}
            <h1 className="display-1">{mode ? item.answer : item.question}</h1>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MyCardStatic;
