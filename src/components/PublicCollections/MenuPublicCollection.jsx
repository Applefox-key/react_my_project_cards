import React from "react";
// import cl from "../../styles/collectMenu.scss";
import TGB from "../UI/tgb/TGB";
import "../../styles/collectMenu.scss";
import { Button, ButtonGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/collectMenu.scss";
import MyDropDownBtn from "../UI/MyDropDownBtn/MyDropDowmBtn";
import BackBtn from "../UI/BackBtn/BackBtn";
import { GO_TO } from "../../router/routes";
import { gameMenuArrPub } from "../../utils/games";

const MenuPublicCollection = ({ collection, addToMyCollection, setMode }) => {
  const pageParam = useParams();
  const gameMenu = gameMenuArrPub(pageParam);
  const router = useNavigate();
  return (
    <div className="string_menu d-flex justify-content-between mt-2">
      <div className="d-flex align-items-center"></div>{" "}
      <div className="menufind">
        <h1 className="menu-title" onClick={(e) => router(GO_TO.pubCollect)}>
          Public collections
        </h1>
        <h1>{collection.name}</h1>
        {collection.category && (
          <p
            className="badge fst-italic bg-primary ms-1 pointer"
            style={{ fontSize: "1.1rem" }}>
            {collection.category}
          </p>
        )}
        <TGB
          checked={window.location.hash === "#1" ? 1 : 0}
          onChange={setMode}
        />
      </div>
      <div className="box_menu">
        <ButtonGroup
          aria-label="delete and renaming buttons"
          size="lg"
          className="d-flex w-100 flex-column menuBtn">
          <MyDropDownBtn
            as={ButtonGroup}
            arr={gameMenu}
            title="PLAY GAMES"
            variant="light"
            className="menuBtn"
          />
          <Button
            variant="light"
            className="menuBtn"
            onClick={addToMyCollection}>
            Add to my collections
          </Button>
          <BackBtn />
        </ButtonGroup>
      </div>
    </div>
  );
};

export default MenuPublicCollection;
