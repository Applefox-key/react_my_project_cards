import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/viewForms.scss";
import { getFirstEl } from "../../utils/arraysFunc";
import CollectionCardBtns from "./CollectionCardBtns";
import GamesMenu from "../UI/GamesMenu/GamesMenu";

const CollectionCard = ({ oneSet, routeOne, listFn = "" }) => {
  const router = useNavigate();
  const generateContent = (el) => {
    if (el.question) return el.question;
    if (el.answer) return el.answer;
    return "picture cards";
  };

  return (
    <div
      className="oneCollect-wrap "
      onClick={(e) => {
        router(`${routeOne}/${oneSet.collection.id}/${oneSet.collection.name}`);
      }}>
      <div className="oneCollect">
        <div className="header">{oneSet.collection.name}</div>{" "}
        <span>{oneSet.content.length}</span>{" "}
        {oneSet.collection.category && (
          <div className="cat_tag">{oneSet.collection.category}</div>
        )}{" "}
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
      </div>{" "}
      <CollectionCardBtns {...{ oneSet, routeOne, listFn }} />
    </div>
  );
};

export default CollectionCard;
