import React from "react";

import "../../styles/collectMenu.scss";
import { HiPlus } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import ToggleView from "../UI/TogleView/ToggleView";
import { RiArrowGoBackLine } from "react-icons/ri";
import CollectionPagePath from "../UI/CollectionPagePath";

const PlaylistsMenu = (props) => {
  const router = useNavigate();
  const arrPath = [
    { name: "My library", action: () => router("/myLibrary") },
    { name: "Playlists", action: null },
  ];
  return (
    <div className="string_menu_play">
      <div className="menufind">
        <CollectionPagePath list={arrPath} />
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
            <RiArrowGoBackLine />
          </button>
        </div>{" "}
      </div>
    </div>
  );
};

export default PlaylistsMenu;
