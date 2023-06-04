import React from "react";
import MyFilter from "../UI/MyFilter/MyFilter";
import "../../styles/collectMenu.scss";
import TGB from "../UI/tgb/TGB";
import { fragment_SearchingTips } from "../../utils/pagesFragments";

const PlayListsMenu = (props) => {
  return (
    <div className="string_menu d-flex justify-content-between">
      {/* <div className="d-flex align-items-center"></div>{" "} */}
      <div className="menufind">
        <h1>My playlists</h1>
        <MyFilter
          filter={props.commonSettings.filter}
          setFilter={(val) => props.setSettingsCommon("filter", val)}
        />
        <TGB
          checked={window.location.hash === "#1" ? 1 : 0}
          onChange={props.viewmodeChange}
        />
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
