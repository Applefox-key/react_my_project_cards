import React from "react";
import ModalFileContentBtns from "./addContent/ModalFileContentBtns";
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
        <ModalFileContentBtns
          setVisible={setMod}
          setContent={setContent}
          colId={colObj.collection.id}
        />
      )}{" "}
    </div>
  );
};

export default ModalCommand;
