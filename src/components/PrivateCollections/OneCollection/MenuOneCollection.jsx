import React, { useState } from "react";
import "../../../styles/collectMenu.scss";
import TGB from "../../UI/tgb/TGB";
import CollectionEditModal from "../OneCollectionActions/CollectionEditModal";
import { GO_TO } from "../../../router/routes";
import { useNavigate } from "react-router-dom";

const MenuOneCollection = (props) => {
  const [renameMode, setRenameMode] = useState(false);
  const router = useNavigate();

  return (
    <div className="string_menu d-flex justify-content-between mt-2">
      {renameMode && (
        <CollectionEditModal
          isEdit={renameMode}
          setIsEdit={setRenameMode}
          collection={props.colObj.collection}
          cancel={setRenameMode}
        />
      )}
      <div className="d-flex align-items-center"></div>{" "}
      <div className="menufind">
        <h1 onClick={(e) => router(GO_TO.myCollect)}>My collections</h1>

        <div className="name-collect" onClick={() => setRenameMode(true)}>
          <h1 className="pointer">{props.colObj.collection.name}</h1>{" "}
        </div>
        <TGB
          checked={window.location.hash === "#1" ? 1 : 0}
          onChange={props.setMode}
        />
      </div>
      <div>
        {props.colObj.collection.note && (
          <div className="note">
            {" "}
            {"About collection: " + props.colObj.collection.note}{" "}
          </div>
        )}
        {props.colObj.collection.category && (
          <div className="cat"> {props.colObj.collection.category}</div>
        )}
      </div>
    </div>
  );
};

export default MenuOneCollection;
