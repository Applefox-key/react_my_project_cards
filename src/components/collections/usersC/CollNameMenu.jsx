import React, { useState } from "react";
import CollectionEditModal from "./CollectionEditModal";

import NavOneColl from "./NavOneColl";

const CollNameMenu = ({ colObj, setContent, setCollect }) => {
  const [renameMode, setRenameMode] = useState(false);

  return (
    <div className="string_menu">
      {renameMode && (
        <CollectionEditModal
          isEdit={renameMode}
          setIsEdit={setRenameMode}
          collection={colObj.collection}
          cancel={setRenameMode}
        />
      )}
      {/* <div className="d-flex  justify-content-between flex-row flex-wrap"> */}
      <div className="d-flex align-items-center">
        {" "}
        <div>
          <h1
            // className="display-5 ms-4 pe-auto"
            onClick={() => setRenameMode(true)}>
            {"My collections / " + colObj.collection.name}
          </h1>
          {/* <p>{colObj.collection.note}</p> */}
        </div>
        <p
          className="badge fst-italic bg-primary ms-1"
          style={{ fontSize: "1.1rem" }}>
          {colObj.collection.category}
        </p>
      </div>

      <NavOneColl setContent={setContent} colObj={colObj} />
      {/* </div> */}
    </div>
  );
};

export default CollNameMenu;
