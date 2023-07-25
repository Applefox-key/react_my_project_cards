import React from "react";
import "../CollectionsCommon/collectionList.scss";
import { TfiSharethis } from "react-icons/tfi";
import { FiUserCheck } from "react-icons/fi";
import cl from "./CategorySelection.module.scss";
import { HiHeart, HiOutlineHeart, HiOutlineShare } from "react-icons/hi2";
import { RiDeleteBin2Line } from "react-icons/ri";

const CollectionRowBtns = ({ col, catid, listFn = "" }) => {
  return (
    <>
      {window.location.pathname.includes("pub") ? (
        <div className={cl["item-btns-staticpub"]}>
          {col.isMy ? (
            <div className="mypbbtn" title={"my collections"}>
              <FiUserCheck />
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <>
          <div className={cl["item-btns-static"]}>
            {col.isFavorite ? <HiHeart /> : <></>}
            {col.isPublic ? <TfiSharethis /> : <></>}
          </div>
          <div className={cl["item-btns"]}>
            <button
              title={col.isPublic ? "unshare" : "share"}
              onClick={(e) => {
                e.stopPropagation();
                listFn.shareColl(col, catid);
              }}>
              {col.isPublic ? <TfiSharethis /> : <HiOutlineShare />}
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
              <RiDeleteBin2Line />
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default CollectionRowBtns;
