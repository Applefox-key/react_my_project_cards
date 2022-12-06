import React from "react";
import ModalFileContent from "./addContent/ModalFileContent";

import ModalPasteContent from "./addContent/ModalPasteContent";
import CollectionShare from "./CollectionShare";

const ModalCommand = ({ mod, setMod, colObj, setContent }) => {
  return (
    <div>
      {mod === "share" && (
        <CollectionShare setVisible={setMod} colObj={colObj} />
      )}{" "}
      {mod === "list" && (
        <ModalPasteContent
          setVisible={setMod}
          setContent={setContent}
          pageParam={colObj}
        />
      )}{" "}
      {mod === "file" && (
        <ModalFileContent
          setVisible={setMod}
          setContent={setContent}
          colId={colObj.collection.id}
        />
      )}{" "}
    </div>
  );
};

export default ModalCommand;
