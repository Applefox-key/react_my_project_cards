import React from "react";
import "../CollectionsCommon/collectionList.scss";
import { FiUserCheck } from "react-icons/fi";
import cl from "./CategorySelection.module.scss";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { HiShare } from "react-icons/hi2";
import { CiShare2 } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";

const CollectionRowBtns = ({ col, catid, listFn = "" }) => {
  return (
    <>
      {window.location.pathname.includes("pub") ? (
        <div className={cl["item-btns-staticpub"]}>
          {col.isMy ? (
            <div className={cl["item-btns-pb"]} title={"my library"}>
              <FiUserCheck />
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <>
          <div className={cl["item-btns-static"]}>
            {col.isFavorite ? <FaRegHeart /> : <></>}
            {col.isPublic ? <CiShare2 /> : <></>}
          </div>
          <div className={cl["item-btns"]}>
            <button
              title={col.isPublic ? "unshare" : "share"}
              onClick={(e) => {
                e.stopPropagation();
                listFn.shareColl(col, catid);
              }}>
              {col.isPublic ? <HiShare /> : <CiShare2 />}
            </button>
            <button
              title={col.isFavorite ? "unfavorite" : "to favorite"}
              onClick={(e) => {
                e.stopPropagation();
                listFn.favoriteColl(col, catid);
              }}>
              {col.isFavorite ? <HiHeart /> : <HiOutlineHeart />}
            </button>{" "}
            <button
              title="delete"
              onClick={(e) => {
                e.stopPropagation();
                listFn.delColl(col, catid);
              }}>
              ❌{/* <RiDeleteBin2Line /> */}
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default CollectionRowBtns;
