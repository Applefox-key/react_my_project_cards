import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import { useNavigate, useParams } from "react-router-dom";

import BackBtn from "../../UI/BackBtn/BackBtn";

import MyDropDownBtn from "../../UI/MyDropDownBtn/MyDropDowmBtn";
import BaseAPI from "../../../API/BaseAPI";
import { GO_TO } from "../../../router/routes";
import ModalCommand from "../OneCollectionActions/ModalCommand";
import { gameMenuArrPriv } from "../../../utils/games";
import { usePopup } from "../../../hooks/usePopup";
import { share } from "../../../utils/contentRequests";
import "../../../styles/collectMenu.scss";
const MenuActionsPart = ({ colObj, setContent }) => {
  const [mod, setMod] = useState(false);
  const setPopup = usePopup();
  const router = useNavigate();
  // const share = async () => {
  //   try {
  //     await BaseAPI.editColParam(
  //       { isPublic: !colObj.collection.isPublic },
  //       colObj.collection.id
  //     );
  //     setPopup.success("the collection has been shared");
  //   } catch (error) {
  //     setPopup.error(error);
  //   }
  // };

  const removeCollection = async () => {
    if (!window.confirm("Remove this collection?")) return;
    await BaseAPI.deleteColection(colObj.collection.id);
    router(GO_TO.myCollect);
  };

  const pageParam = useParams();
  const gameMenu = gameMenuArrPriv(pageParam);
  const addRow = () => {
    router(`${GO_TO.editCard}/${pageParam.id}/${pageParam.name}/new`);
  };
  const impotrArr = [
    {
      name: "Add from the file",
      onClick: () => {
        setMod("file");
      },
    },
    {
      name: "Add from the list",
      onClick: () => {
        setMod("list");
      },
    },
  ];

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
        className="d-flex w-100 flex-column ">
        <MyDropDownBtn
          as={ButtonGroup}
          arr={gameMenu}
          title="PLAY GAMES"
          variant="light"
          className="menuBtn"
          drop="end"
          dis={colObj.content ? colObj.content.length === 0 : true}
        />{" "}
        <Button variant="light" className="menuBtn" onClick={addRow}>
          ➕ Add card
        </Button>{" "}
        <MyDropDownBtn
          className="menuBtn"
          as={ButtonGroup}
          arr={impotrArr}
          drop="end"
          title="Import"
          variant="light"
        />{" "}
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