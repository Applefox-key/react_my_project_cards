import React from "react";
import { CiMenuKebab } from "react-icons/ci";
import { RiDeleteBin2Line } from "react-icons/ri";
import cl from "./SideBar.module.scss";

const CategoryMiniMenu = ({ el, setIsMenu, isMenu, deleteFn }) => {
  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsMenu(isMenu ? "" : el.id);
        }}>
        <CiMenuKebab />
      </button>
      {isMenu && (
        <div className={cl.miniMenu} id="miniMenu">
          <button
            title="delete label (collections will not be deleted)"
            onClick={(e) => {
              e.stopPropagation();
              deleteFn(el);
            }}>
            <RiDeleteBin2Line />
            {el.id !== "all" ? "delete label" : "delete all"}
          </button>
        </div>
      )}
    </>
  );
};

export default CategoryMiniMenu;
