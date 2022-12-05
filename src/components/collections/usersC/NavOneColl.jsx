import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import { useNavigate } from "react-router-dom";
import BaseAPI from "../../../API/BaseAPI";

import BackBtn from "../../UI/BackBtn/BackBtn";
import ModalCommand from "./ModalCommand";
import MyDropDownBtn from "../../UI/MyDropDownBtn/MyDropDowmBtn";

const NavOneColl = ({ colObj, setContent }) => {
  const [mod, setMod] = useState(false);
  const router = useNavigate();

  const modal = (el) => {
    setMod(el);
  };

  const removeCollection = async () => {
    if (!window.confirm("Remove this collection?")) return;
    await BaseAPI.deleteColection(colObj.collection.id);
    router("/collections/my");
  };
  const gameMenu = [
    {
      name: "Cards: question - answer",
      href: `/play_cards/my/0/${colObj.collection.id}/${colObj.collection.name}`,
    },

    {
      name: " Cards: answer - question",
      href: `/play_cards/my/1/${colObj.collection.id}/${colObj.collection.name}`,
    },
    {
      name: "Cards: time",
      href: `/play_timecard/my/${colObj.collection.id}/${colObj.collection.name}`,
    },
    { name: "Divider", href: "" },
    {
      name: "Find pairs",
      href: `/play_pairs/my/${colObj.collection.id}/${colObj.collection.name}`,
    },
    {
      name: "Find the right answer",
      href: `/play_test/my/${colObj.collection.id}/${colObj.collection.name}`,
    },
    {
      name: "Write an answer",
      href: `/play_write/my/${colObj.collection.id}/${colObj.collection.name}`,
    },
  ];

  return (
    <div className="d-flex   justify-content-between ">
      <div className="d-flex   align-items-start">
        {mod ? (
          <ModalCommand
            mod={mod}
            setMod={setMod}
            setContent={setContent}
            colObj={colObj}
          />
        ) : (
          <></>
        )}
        <ButtonGroup
          size="lg"
          aria-label="delete and renaming buttons"
          className="d-flex">
          <MyDropDownBtn
            as={ButtonGroup}
            arr={gameMenu}
            title="PLAY GAMES"
            variant="outline-primary"
            dis={colObj.content ? colObj.content.length === 0 : true}
          />
          <Button variant="outline-primary" onClick={removeCollection}>
            Remove
          </Button>{" "}
          <Button variant="outline-primary" onClick={() => modal("share")}>
            🌀Share
          </Button>
          <MyDropDownBtn
            as={ButtonGroup}
            arr={[
              {
                name: "Add from the file",
                onClick: () => modal("file"),
              },
              { name: "Add from the list", onClick: () => modal("list") },
            ]}
            title="Import"
            variant="outline-primary"
          />{" "}
          <BackBtn />
        </ButtonGroup>
      </div>{" "}
    </div>
  );
};

export default NavOneColl;
