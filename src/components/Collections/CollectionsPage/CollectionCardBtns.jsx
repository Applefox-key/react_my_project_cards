import React from "react";

import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { FiUserCheck } from "react-icons/fi";
import { LuCopyPlus } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { HiShare } from "react-icons/hi2";
import { CiShare2 } from "react-icons/ci";

import "../../../styles/viewForms.scss";

import { usePopup } from "../../../hooks/usePopup";
import BaseAPI from "../../../API/BaseAPI";

const CollectionCardBtns = ({ oneSet, routeOne, listFn = "" }) => {
  const setPopup = usePopup();
  return (
    <div className="btns-div">
      {routeOne !== "/collections/my" ? (
        oneSet.isMy ? (
          <div className="mypbbtn" title={"my library"}>
            <FiUserCheck />
          </div>
        ) : (
          <div
            className="sharebtn"
            title={"copy to my library"}
            onClick={async (e) => {
              if (!oneSet.content) return;
              if (!oneSet.collection) return;
              let res = await BaseAPI.copySharedCollection(oneSet.collection);
              setPopup.success(res.message);
            }}>
            <LuCopyPlus />
          </div>
        )
      ) : (
        <>
          {" "}
          <div
            className="sharebtn delbtn"
            title="delete"
            onClick={(e) => {
              e.stopPropagation();
              listFn.delColl(oneSet.collection);
            }}>
            <IoMdClose />
          </div>
          {!!oneSet.collection.isPublic && (
            <div className="shareSymb">
              <HiShare />
            </div>
          )}
          {!!oneSet.collection.isFavorite && (
            <div className="shareSymb heartSymb">
              <HiHeart />
            </div>
          )}
          <div
            className="sharebtn"
            title={oneSet.collection.isPublic ? "unshare" : "share"}
            onClick={(e) => {
              e.stopPropagation();
              listFn.shareColl(oneSet.collection);
            }}>
            {oneSet.collection.isPublic ? <HiShare /> : <CiShare2 />}
          </div>
          <div
            className="sharebtn heartbtn"
            title={oneSet.collection.isFavorite ? "unfavorite" : "to favorite"}
            onClick={(e) => {
              e.stopPropagation();
              listFn.favoriteColl(oneSet.collection);
            }}>
            {oneSet.collection.isFavorite ? <HiHeart /> : <HiOutlineHeart />}
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default CollectionCardBtns;
