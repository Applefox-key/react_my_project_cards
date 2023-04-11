import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import { useNavigate, useParams } from "react-router-dom";
import BackBtn from "../../UI/BackBtn/BackBtn";
import BaseAPI from "../../../API/BaseAPI";
import { GO_TO } from "../../../router/routes";
import ModalCommand from "../OneCollectionActions/ModalCommand";
import { usePopup } from "../../../hooks/usePopup";
import { share } from "../../../utils/contentRequests";
import "../../../styles/collectMenu.scss";
import PlayGamesDropDown from "../../UI/PlayGamesDropDown/PlayGamesDropDown";
import MyDropDownBtn from "../../UI/MyDropDownBtn/MyDropDowmBtn";
import { getImportMenu } from "../../../utils/editCollectionHlp";

const MenuActionsPart = ({ colObj, setContent }) => {
  const [mod, setMod] = useState(false);
  const setPopup = usePopup();
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
        // className="d-flex w-100 flex-column ">
        className="actionMenu">
        <PlayGamesDropDown
          isPublic={false}
          dis={colObj.content ? colObj.content.length === 0 : true}
        />
        <Button variant="light" className="menuBtn" onClick={addRow}>
          ➕ Add card
        </Button>{" "}
        <MyDropDownBtn
          className="menuBtn"
          as={ButtonGroup}
          arr={importArr}
          drop="end"
          title="Import"
          variant="light"
        />
        <Button variant="light" className="menuBtn" onClick={removeCollection}>
          Remove
        </Button>{" "}
        <Button
          variant="light"
          onClick={() => setMod("share")}
          className="menuBtn">
          Download
        </Button>{" "}
        <Button
          variant="light"
          onClick={(e) => share(colObj.collection, setPopup)}
          className="menuBtn">
          {colObj.collection.isPublic ? "Unshare" : "Share"}
        </Button>
        <BackBtn />
      </ButtonGroup>
    </>
    // </div>
  );
};

export default MenuActionsPart;
