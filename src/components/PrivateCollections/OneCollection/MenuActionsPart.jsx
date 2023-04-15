import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import { useNavigate, useParams } from "react-router-dom";
import BackBtn from "../../UI/BackBtn/BackBtn";
import BaseAPI from "../../../API/BaseAPI";
import { GO_TO } from "../../../router/routes";
import ModalCommand from "../OneCollectionActions/ModalCommand";
import "../../../styles/collectMenu.scss";
import PlayGamesDropDown from "../../UI/PlayGamesDropDown/PlayGamesDropDown";
import { getImportMenu } from "../../../utils/editCollectionHlp";
import {
  HiPrinter,
  HiPlus,
  HiOutlineDocumentDownload,
  HiOutlineDocumentRemove,
} from "react-icons/hi";
import DropDownMenu from "../../UI/MyDropDownBtn/DropDownMenu";

const MenuActionsPart = ({ colObj, setContent }) => {
  const [mod, setMod] = useState(false);
  const router = useNavigate();
  const pageParam = useParams();

  const removeCollection = async () => {
    if (!window.confirm("Remove this collection?")) return;
    await BaseAPI.deleteColection(colObj.collection.id);
    router(GO_TO.myCollect);
  };

  const addRow = () => {
    router(`${GO_TO.editCard}/${pageParam.id}/${pageParam.name}/new`);
  };
  const importArr = getImportMenu(setMod);

  return (
    <>
      {mod && (
        <ModalCommand
          mod={mod}
          setMod={setMod}
          setContent={setContent}
          colObj={colObj}
        />
      )}
      <ButtonGroup
        size="lg"
        aria-label="delete and renaming buttons"
        className="actionMenu">
        <PlayGamesDropDown
          isPublic={false}
          dis={colObj.content ? colObj.content.length === 0 : true}
        />
        <Button variant="light" className="menuBtn" onClick={addRow}>
          Add card <HiPlus />
        </Button>{" "}
        <DropDownMenu
          className="menuBtn"
          arr={importArr}
          title="Import cards"
        />
        <Button variant="light" className="menuBtn" onClick={removeCollection}>
          Remove <HiOutlineDocumentRemove />
        </Button>{" "}
        <Button
          variant="light"
          className="menuBtn"
          onClick={() =>
            router(
              `${GO_TO.myCollect}${GO_TO.print}/${pageParam.id}/${pageParam.name}`
            )
          }>
          Print
          <HiPrinter />
        </Button>{" "}
        <Button
          variant="light"
          onClick={() => setMod("share")}
          className="menuBtn">
          Download <HiOutlineDocumentDownload />
        </Button>{" "}
        <BackBtn />
      </ButtonGroup>
    </>
    // </div>
  );
};

export default MenuActionsPart;
