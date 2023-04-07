import React, { useState } from "react";
import "../../../styles/collectMenu.scss";
import TGB from "../../UI/tgb/TGB";
import CollectionEditModal from "../OneCollectionActions/CollectionEditModal";
import MenuActionsPart from "./MenuActionsPart";
import { GO_TO } from "../../../router/routes";
import { useNavigate } from "react-router-dom";

const MenuOneCollection = (props) => {
  const [renameMode, setRenameMode] = useState(false);
  const router = useNavigate();
  return (
    <div className="string_menu d-flex justify-content-between mt-2">
      {" "}
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
        <h1 className="menu-title" onClick={(e) => router(GO_TO.myCollect)}>
          My collections
        </h1>
        <div className="name-collect" onClick={() => setRenameMode(true)}>
          <h1 className="pointer">{props.colObj.collection.name}</h1>
          <span
            // className="badge fst-italic bg-primary ms-1 pointer"
            style={{ fontSize: "1.1rem" }}>
            {props.colObj.collection.category}
          </span>
        </div>
        <TGB
          checked={window.location.hash === "#1" ? 1 : 0}
          onChange={props.setMode}
        />
      </div>
      <div className="box_menu">
        <MenuActionsPart
          setContent={props.setContent}
          colObj={props.colObj}
          mode={props.mode}
          setMode={props.setMode}
        />
      </div>
    </div>
  );
};

export default MenuOneCollection;
