import React from "react";
import MyFilter from "../UI/MyFilter/MyFilter";
import "../../styles/collectMenu.scss";
import TGB from "../UI/tgb/TGB";
import { fragment_SearchingTips } from "../../utils/pagesFragments";

const CollectionsMenu = (props) => {
  const isPublic = window.location.pathname.includes("pub");

  return (
    <div className="string_menu d-flex justify-content-between">
      <div className="d-flex align-items-center"></div>{" "}
      <div className="menufind">
        <h1>{isPublic ? "Public collections" : "My collections"}</h1>
        <MyFilter
          filter={props.commonSettings.filter}
          setFilter={(val) => props.setSettingsCommon("filter", val)}
        />
        <TGB
          checked={window.location.hash === "#1" ? 1 : 0}
          onChange={props.viewmodeChange}
        />
      </div>
      {/* {props.privateSettings.shared && "only shared "}
      {props.privateSettings.favorite && "only favorite "} */}
      {fragment_SearchingTips(
        props.commonSettings,
        props.privateSettings,
        props.setSettingsCommon
      )}
    </div>
  );
};

export default CollectionsMenu;
