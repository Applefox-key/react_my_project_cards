import React from "react";
import TGB from "../UI/tgb/TGB";
import "../../styles/collectMenu.scss";
import { Button, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../styles/collectMenu.scss";
import BackBtn from "../UI/BackBtn/BackBtn";
import { GO_TO } from "../../router/routes";
import { HiPrinter } from "react-icons/hi";
import { GrChapterAdd } from "react-icons/gr";
import PlayGamesDropDown from "../UI/PlayGamesDropDown/PlayGamesDropDown";

const MenuPublicCollection = ({ collection, addToMyCollection, setMode }) => {
  const router = useNavigate();
  return (
    <div className="string_menu d-flex justify-content-between mt-2">
      <div className="d-flex align-items-center"></div>{" "}
      <div className="menufind">
        <h1 className="menu-title" onClick={(e) => router(GO_TO.pubCollect)}>
          Public collections
        </h1>
        <h1>{collection.name}</h1>

        <TGB
          checked={window.location.hash === "#1" ? 1 : 0}
          onChange={setMode}
        />
      </div>
      <div className="box_menu">
        <ButtonGroup
          aria-label="action buttons"
          size="lg"
          className="actionMenu">
          <PlayGamesDropDown isPublic={true} />
          <Button
            variant="light"
            className="menuBtn"
            title="Copy to my collections"
            onClick={addToMyCollection}>
            Copy to my set{<GrChapterAdd />}
          </Button>{" "}
          <Button
            variant="light"
            className="menuBtn"
            onClick={() =>
              router(
                `${GO_TO.pubCollect}${GO_TO.print}/${collection.id}/${collection.name}`
              )
            }>
            Print
            <HiPrinter />
          </Button>{" "}
          <BackBtn />
        </ButtonGroup>
      </div>
    </div>
  );
};

export default MenuPublicCollection;
