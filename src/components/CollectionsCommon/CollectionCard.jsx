import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/viewForms.scss";
import { getFirstEl } from "../../utils/arraysFunc";
import CollectionCardBtns from "./CollectionCardBtns";
import GamesMenu from "../UI/GamesMenu/GamesMenu";
import { FaArrowsToEye } from "react-icons/fa6";

const CollectionCard = ({ oneSet, routeOne, listFn = "" }) => {
  const [isHover, setIsHover] = useState(false);
  const router = useNavigate();
  const generateContent = (el) => {
    if (el.question) return el.question;
    if (el.answer) return el.answer;
    return "picture cards";
  };
  const toSet = (e) => {
    e.stopPropagation();
    router(`${routeOne}/${oneSet.collection.id}/${oneSet.collection.name}`);
  };

  const handleLookHover = (e) => {
    e.stopPropagation();
    setIsHover(true);
  };

  const handleBtnsMouseLeave = (e) => {
    e.stopPropagation();
    setIsHover(false);
  };
  return (
    <>
      <div
        className={isHover ? "oneCollect-wrap isHover" : "oneCollect-wrap"}
        onMouseLeave={handleBtnsMouseLeave}
        onClick={toSet}>
        <div className="oneCollect">
          <div className="header">{oneSet.collection.name}</div>
          <span>{oneSet.content.length}</span>
          {oneSet.collection.category && (
            <div className="cat_tag">{oneSet.collection.category}</div>
          )}
          {!!oneSet.content.length && window.location.hash !== "#1" && (
            <div className="playmenu">
              <GamesMenu cardSet={oneSet.collection} />
            </div>
          )}
          <div className="collectBody">
            {getFirstEl(oneSet.content, 5).map((el, i) => (
              <div className="content-row" key={i}>
                {generateContent(el)}
              </div>
            ))}
          </div>
        </div>
        {isHover && <CollectionCardBtns {...{ oneSet, routeOne, listFn }} />}{" "}
        {!isHover && (
          <div
            className="look0"
            onMouseEnter={handleLookHover}
            onClick={handleLookHover}>
            <FaArrowsToEye />
          </div>
        )}
      </div>
    </>
  );
};

export default CollectionCard;
