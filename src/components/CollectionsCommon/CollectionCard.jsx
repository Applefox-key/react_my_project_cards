import React from "react";
import { useNavigate } from "react-router-dom";
import "./collectionList.scss";
import { getFirstEl } from "../../utils/arraysFunc";
import PlayMenu from "../UI/PlayMenu/PlayMenu";
import CollectionCardBtns from "./CollectionCardBtns";

const CollectionCard = ({ oneSet, routeOne, listFn = "" }) => {
  const router = useNavigate();
  const generateContent = (el) => {
    if (el.question) return el.question;
    if (el.answer) return el.answer;
    return "picture cards";
  };

  return (
    <div className="oneCollect-wrap ">
      <div
        className="oneCollect"
        onClick={(e) => {
          router(
            `${routeOne}/${oneSet.collection.id}/${oneSet.collection.name}`
          );
        }}>
        <div className="header">{oneSet.collection.name}</div>
        <div className="collectBody">
          {getFirstEl(oneSet.content, 5).map((el, i) => (
            <div className="content-row" key={i}>
              {generateContent(el)}
            </div>
          ))}
        </div>
        <span>{oneSet.content.length}</span>{" "}
        {oneSet.collection.category && (
          <div className="cat_tag">{oneSet.collection.category}</div>
        )}
        {!!oneSet.content.length && window.location.hash !== "#1" && (
          <PlayMenu collection={oneSet.collection} />
        )}
      </div>
      <CollectionCardBtns {...{ oneSet, routeOne, listFn }} />
    </div>
  );
};

export default CollectionCard;
