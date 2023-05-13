import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineRollback } from "react-icons/ai";
import cl from "../SideBar.module.scss";
import { HiShare, HiHeart, HiPlus } from "react-icons/hi";
import { RiFoldersFill } from "react-icons/ri";

const SideBarMenuIcons = ({ setExpressions, addOne, ...props }) => {
  const isPublic = window.location.pathname.includes("pub");
  const router = useNavigate();
  return (
    <>
      <button
        data-title=" show by categories"
        onClick={() =>
          props.setSettingsCommon(
            "byCategory",
            !props.commonSettings.byCategory
          )
        }>
        <span className={props.commonSettings.byCategory ? cl.activeSpan : ""}>
          <RiFoldersFill />
        </span>
      </button>
      {!isPublic && !props.commonSettings.byCategory && (
        <>
          <button
            data-title="show only shared"
            onClick={() => props.setSettingsPrivat("shared")}>
            <span className={props.privateSettings.shared ? cl.activeSpan : ""}>
              <HiShare />
            </span>
          </button>
          <button
            data-title="show only favorite"
            onClick={() => props.setSettingsPrivat("favorite")}>
            <span
              className={props.privateSettings.favorite ? cl.activeSpan : ""}>
              <HiHeart />
            </span>
          </button>

          <button
            className={cl.shadow}
            onClick={() => props.setSettingsPrivat("isNew")}
            data-title="Create new set ">
            <HiPlus />
          </button>
        </>
      )}
      <button
        data-title="Back"
        onClick={() => {
          router(-1);
        }}
        className={cl.shadow}>
        <AiOutlineRollback />
      </button>{" "}
    </>
  );
};

export default SideBarMenuIcons;
