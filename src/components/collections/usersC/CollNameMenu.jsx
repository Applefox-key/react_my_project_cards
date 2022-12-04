import React, { useState } from "react";
import CollectionEditModal from "./CollectionEditModal";

import NavOneColl from "./NavOneColl";

const CollNameMenu = ({ colObj, setContent, setCollect }) => {
  const [renameMode, setRenameMode] = useState(false);

  return (
    <div>
      {renameMode && (
        <CollectionEditModal
          isEdit={renameMode}
          setIsEdit={setRenameMode}
          collection={colObj.collection}
          cancel={setRenameMode}
        />
      )}
      <div className="d-flex  justify-content-between flex-row flex-wrap">
        <div className="d-flex">
          {" "}
          <div>
            <h1
              className="display-5 ms-4 pe-auto"
              onClick={() => setRenameMode(true)}>
              {colObj.collection.name}
            </h1>
            <p>{colObj.collection.note}</p>
          </div>
          <p>{colObj.collection.category}</p>
        </div>

        <NavOneColl setContent={setContent} colObj={colObj} />
      </div>
    </div>
  );
};

export default CollNameMenu;
