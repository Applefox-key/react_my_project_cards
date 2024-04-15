import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/viewForms.scss";
import { getFirstEl } from "../../utils/arraysFunc";
import CollectionCardBtns from "./CollectionCardBtns";
import GamesMenu from "../UI/GamesMenu/GamesMenu";

const CollectionCard = ({ oneSet, routeOne, listFn = "" }) => {
  // const [isHover, setIsHover] = useState(false);
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
  // const viewSet = (e) => {
  //   e.stopPropagation();
  //   setIsHover(!isHover);
  // };
  return (
    <div
      // className={isHover ? "oneCollect-wrap isHover" : "oneCollect-wrap"}
      className={"oneCollect-wrap"}
      onClick={toSet}>
      <div className="oneCollect">
        {/* <div className="look" onClick={viewSet}>
          look
        </div> */}
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
      <CollectionCardBtns {...{ oneSet, routeOne, listFn }} />
    </div>
  );
};

export default CollectionCard;
