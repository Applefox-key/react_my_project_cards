import React from "react";
import { useNavigate } from "react-router-dom";
import "./collectionList.scss";
import { getFirstEl } from "../../utils/arraysFunc";
import {
  HiShare,
  HiOutlineShare,
  HiOutlineHeart,
  HiHeart,
  HiPrinter,
} from "react-icons/hi";
import PlayMenu from "../UI/PlayGamesDropDown/PlayMenu";
import { GO_TO } from "../../router/routes";

const CollectionCard = ({ collection, routeOne, listFn = "" }) => {
  const router = useNavigate();
  const generateContent = (el) => {
    if (el.question) return el.question;
    if (el.answer) return el.answer;
    return "picture cards";
  };
  console.log(collection.collection.isFavorite);

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
        {collection.content.length && (
          <PlayMenu collection={collection.collection} />
        )}
      </div>

      {listFn && (
        <>
          {collection.collection.isFavorite ? (
            <div className="shareSymb heartSymb">
              <HiHeart />
            </div>
          ) : (
            <></>
          )}
          {collection.collection.isPublic ? (
            <div className="shareSymb">
              <HiShare />
            </div>
          ) : (
            <></>
          )}

          <div
            className="sharebtn prnbtn"
            title="print cards"
            onClick={(e) => {
              e.stopPropagation();
              router(
                `${GO_TO.print}/my/${collection.collection.id}/${collection.collection.name}`
              );
            }}>
            <HiPrinter />
          </div>
          <div
            className="sharebtn"
            title={collection.collection.isPublic ? "unshare" : "share"}
            onClick={(e) => {
              e.stopPropagation();
              listFn.shareColl(collection.collection);
            }}>
            {collection.collection.isPublic ? <HiShare /> : <HiOutlineShare />}
          </div>
          <div
            className="sharebtn heartbtn"
            title={collection.collection.isFavorite ? "delete" : "add"}
            onClick={(e) => {
              e.stopPropagation();
              listFn.favoriteColl(collection.collection);
            }}>
            {collection.collection.isFavorite ? (
              <HiHeart />
            ) : (
              <HiOutlineHeart />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CollectionCard;
//  <Badge bg="secondary">New</Badge>
