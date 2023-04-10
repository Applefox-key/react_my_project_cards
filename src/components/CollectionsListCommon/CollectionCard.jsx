import React from "react";
import { useNavigate } from "react-router-dom";
import "./collectionList.scss";
import { getFirstEl } from "../../utils/arraysFunc";
import { HiShare, HiOutlineShare } from "react-icons/hi";
import PlayMenu from "../UI/PlayGamesDropDown/PlayMenu";
const CollectionCard = ({ collection, routeOne, listFn = "" }) => {
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
            `${routeOne}/${collection.collection.id}/${collection.collection.name}`
          );
        }}>
        <div className="header">{collection.collection.name}</div>
        {listFn && (
          <div>
            <div
              className="delbtn"
              onClick={(e) => {
                e.stopPropagation();
                listFn.delColl(collection.collection);
              }}>
              ❌
            </div>
          </div>
        )}
        <div>
          {getFirstEl(collection.content, 5).map((el, i) => (
            <div className="content-row" key={i}>
              {generateContent(el)}
            </div>
          ))}
        </div>{" "}
        <span>{collection.content.length}</span>{" "}
        {collection.collection.category && (
          <div className="cat_tag">{collection.collection.category}</div>
        )}
        <PlayMenu collection={collection.collection} />
      </div>

      {listFn && (
        <>
          {collection.collection.isPublic ? (
            <div className="shareSymb">
              <HiShare />
            </div>
          ) : (
            <></>
          )}
          <div
            className="sharebtn"
            title={collection.collection.isPublic ? "unshare" : "share"}
            onClick={(e) => {
              e.stopPropagation();
              listFn.shareColl(collection.collection);
            }}>
            {collection.collection.isPublic ? <HiShare /> : <HiOutlineShare />}
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default CollectionCard;
//  <Badge bg="secondary">New</Badge>
