import React from "react";
import { FiSettings } from "react-icons/fi";
import { HiHeart, HiPlus, HiShare } from "react-icons/hi2";
import { GO_TO } from "../../../router/routes";
import { useNavigate } from "react-router-dom";

const UsersCollectionsBtn = ({
  commonSettings,
  privateSettings,
  setSettingsPrivat,
}) => {
  const router = useNavigate();
  return (
    <>
      {!commonSettings.byCategory && (
        <div className="buttonBox">
          <button
            className={privateSettings.shared ? "viewBtn checked" : "viewBtn"}
            data-title="show only shared"
            onClick={() => setSettingsPrivat("shared")}>
            <HiShare />
          </button>
          <button
            className={privateSettings.favorite ? "viewBtn checked" : "viewBtn"}
            data-title="show only favorite"
            onClick={() => setSettingsPrivat("favorite")}>
            <HiHeart />
          </button>
        </div>
      )}
      {!commonSettings.byCategory ? (
        <button
          className="viewBtn"
          data-title="Create new set"
          onClick={() => setSettingsPrivat("isNew")}>
          <HiPlus />
        </button>
      ) : (
        <button
          data-title="Categories manager"
          className="viewBtn"
          onClick={() => router(GO_TO.categoriesManager)}>
          <span>
            <FiSettings />
          </span>
        </button>
      )}
    </>
  );
};

export default UsersCollectionsBtn;
