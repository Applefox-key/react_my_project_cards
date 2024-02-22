import React from "react";
import MyFilter from "../UI/MyFilter/MyFilter";
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
        <h1>My playlists</h1>
        <MyFilter
          filter={props.commonSettings.filter}
          setFilter={(val) => props.setSettingsCommon("filter", val)}
        />
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
        <div className="view-settings">
          <ToggleView
            checked={window.location.hash === "#1" ? 1 : 0}
            onChange={props.viewmodeChange}
          />
        </div>
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
