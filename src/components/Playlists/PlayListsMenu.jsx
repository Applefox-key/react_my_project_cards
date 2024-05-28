import React from "react";

import "../../styles/collectMenu.scss";
import { fragment_SearchingTips } from "../../utils/pagesFragments";
import { HiPlus } from "react-icons/hi2";
import { AiOutlineRollback } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ToggleView from "../UI/TogleView/ToggleView";

const PlayListsMenu = (props) => {
  const router = useNavigate();
  return (
    <div className="string_menu">
      <div className="menufind">
        <h1>
          <span className="pointer" onClick={() => router("/myLibrary")}>
            My library
          </span>
          / Playlists
        </h1>
        <div className="view-settings">
          <ToggleView
            checked={window.location.hash === "#1" ? 1 : 0}
            onChange={props.viewmodeChange}
          />
        </div>
        <div className="d-flex">
          <button
            className="viewBtn"
            onClick={() => props.setSettingsCommon("editEl", { id: "new" })}
            data-title="Create new playlist ">
            <HiPlus />
          </button>
          <button
            data-title="Back"
            onClick={() => {
              router(-1);
            }}
            className="viewBtn">
            <AiOutlineRollback />
          </button>
        </div>{" "}
      </div>
      {fragment_SearchingTips(
        props.commonSettings,
        "",
        props.setSettingsCommon
      )}
    </div>
  );
};

export default PlayListsMenu;
