import React from "react";
import cl from "./MyCard.module.scss";
import "./MyCard.module.scss";
import { getImgQ } from "../../../utils/contentRequests";

const MyCardStatic = ({ item }) => {
  return (
    <div className={cl.container_gallery}>
      <div className={cl["card-container"]}>
        <button
          className={cl["card-button"]}
          // onClick={() => setFlipped(!flipped)}
        >
          <div className={cl["card-front"]}>
            {item.imgQ && <img src={getImgQ(item)} alt="" />}
            <h1 className="display-1">{item.question}</h1>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MyCardStatic;
