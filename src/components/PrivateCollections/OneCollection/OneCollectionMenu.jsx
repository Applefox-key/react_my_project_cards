import React, { useState } from "react";
import "../../../styles/collectMenu.scss";
import CollectionEditModal from "../OneCollectionActions/CollectionEditModal";
import ViewSwitch from "../../UI/tgb/ViewSwitch";
import OneCollectionBtns from "../../UI/tgb/OneCollectionBtns";
import BtnPlayMenu from "../../UI/PlayMenu/BtnPlayMenu";

const OneCollectionMenu = (props) => {
  const [renameMode, setRenameMode] = useState(false);

  return (
    <div className="string_menu d-flex justify-content-between">
      {renameMode && (
        <CollectionEditModal
          isEdit={renameMode}
          setIsEdit={setRenameMode}
          collection={props.colObj.collection}
          cancel={setRenameMode}
        />
      )}
      {/* <div className="d-flex align-items-center"></div>{" "} */}

      <div className="menufind">
        <div className="d-flex align-items-center">
          <BtnPlayMenu collection={props.colObj.collection} />
          <div className="d-flex">
            <div className="collectionNoteText">
              {props.colObj.collection.category && (
                <div className="cat"> {props.colObj.collection.category}</div>
              )}
            </div>
            <div className="name-collect" onClick={() => setRenameMode(true)}>
              <h1 className="pointer">{props.colObj.collection.name}</h1>{" "}
            </div>
          </div>
        </div>
        <div className="d-flex">
          <ViewSwitch
            checked={window.location.hash === "#1" ? 1 : 0}
            onChange={props.setMode}
          />
          <OneCollectionBtns
            colObj={props.colObj}
            setContent={props.setContent}
          />
        </div>
      </div>
      <div>
        {props.colObj.collection.note && (
          <div className="note">
            {"About collection: " + props.colObj.collection.note}{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default OneCollectionMenu;
