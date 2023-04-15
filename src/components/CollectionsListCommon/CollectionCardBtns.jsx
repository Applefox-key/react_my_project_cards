import React from "react";
import { useNavigate } from "react-router-dom";
import "./collectionList.scss";
import { GrChapterAdd } from "react-icons/gr";
import {
  HiShare,
  HiOutlineShare,
  HiOutlineHeart,
  HiHeart,
  HiPrinter,
} from "react-icons/hi";
import { GO_TO } from "../../router/routes";
import { usePopup } from "../../hooks/usePopup";
import BaseAPI from "../../API/BaseAPI";

const CollectionCardBtns = ({ oneSet, routeOne, listFn = "" }) => {
  const router = useNavigate();

  const setPopup = usePopup();
  return (
    <div>
      <div
        className="sharebtn prnbtn"
        title="print cards"
        onClick={(e) => {
          e.stopPropagation();
          router(
            `${routeOne}${GO_TO.print}/${oneSet.collection.id}/${oneSet.collection.name}`
          );
        }}>
        <HiPrinter />
      </div>

      {!listFn ? (
        <div
          className="sharebtn"
          title={"copy to my collections"}
          onClick={async (e) => {
            if (!oneSet.content) return;
            if (!oneSet.collection) return;
            let res = await BaseAPI.copySharedCollection(oneSet.collection);
            setPopup.success(res.message);
          }}>
          <GrChapterAdd />
        </div>
      ) : (
        <>
          <div
            className="sharebtn delbtn"
            onClick={(e) => {
              e.stopPropagation();
              listFn.delColl(oneSet.collection);
            }}>
            ❌
          </div>
          {!!oneSet.collection.isFavorite && (
            <div className="shareSymb heartSymb">
              <HiHeart />
            </div>
          )}
          {!!oneSet.collection.isPublic && (
            <div className="shareSymb">
              <HiShare />
            </div>
          )}

          <div
            className="sharebtn"
            title={oneSet.collection.isPublic ? "unshare" : "share"}
            onClick={(e) => {
              e.stopPropagation();
              listFn.shareColl(oneSet.collection);
            }}>
            {oneSet.collection.isPublic ? <HiShare /> : <HiOutlineShare />}
          </div>

          <div
            className="sharebtn heartbtn"
            title={oneSet.collection.isFavorite ? "unfavorite" : "to favorite"}
            onClick={(e) => {
              e.stopPropagation();
              listFn.favoriteColl(oneSet.collection);
            }}>
            {oneSet.collection.isFavorite ? <HiHeart /> : <HiOutlineHeart />}
          </div>
        </>
      )}
    </div>
  );
};

export default CollectionCardBtns;
