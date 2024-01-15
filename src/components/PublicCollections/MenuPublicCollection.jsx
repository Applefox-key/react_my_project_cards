import React from "react";
import "../../styles/collectMenu.scss";
import ViewSwitch from "../UI/tgb/ViewSwitch";
import OnePbCollectionBtns from "../UI/tgb/OnePbCollectionBtns";
import BtnPlayMenu from "../UI/PlayMenu/BtnPlayMenu";

const MenuPublicCollection = (props) => {
  return (
    <div className="string_menu d-flex justify-content-between">
      <div className="d-flex align-items-center"></div>{" "}
      <div className="menufind">
        <div className="d-flex align-items-center">
          <BtnPlayMenu collection={props.collection} />
          <div className="d-flex">
            <div className="collectionNoteText">
              {props.collection.category && (
                <div className="cat"> {props.collection.category}</div>
              )}
            </div>
            <div className="name-collect">
              <h1 className="pointer">{props.collection.name}</h1>{" "}
            </div>
          </div>
        </div>
        <div className="d-flex">
          <ViewSwitch
            checked={window.location.hash === "#1" ? 1 : 0}
            onChange={props.setMode}
          />
          <OnePbCollectionBtns
            collection={props.collection}
            addToMyCollection={props.addToMyCollection}
          />
        </div>
      </div>
      {props.collection.note
        ? "About collection: " + props.collection.note
        : ""}
    </div>
  );
};

export default MenuPublicCollection;
