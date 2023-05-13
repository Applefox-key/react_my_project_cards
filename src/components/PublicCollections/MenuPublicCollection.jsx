import React from "react";
import TGB from "../UI/tgb/TGB";
import "../../styles/collectMenu.scss";
import { useNavigate } from "react-router-dom";
import "../../styles/collectMenu.scss";
import { GO_TO } from "../../router/routes";

const MenuPublicCollection = ({ collection, setMode }) => {
  const router = useNavigate();
  return (
    <div className="string_menu d-flex justify-content-between mt-2">
      <div className="d-flex align-items-center"></div>{" "}
      <div className="menufind">
        <h2 onClick={(e) => router(GO_TO.pubCollect)}>Public collections</h2>
        <h1>{collection.name}</h1>

        <TGB
          checked={window.location.hash === "#1" ? 1 : 0}
          onChange={setMode}
        />
      </div>{" "}
      {collection.note ? "About collection: " + collection.note : ""}
    </div>
  );
};

export default MenuPublicCollection;
