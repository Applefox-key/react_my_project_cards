import React from "react";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import { useParams } from "react-router-dom";
import BackBtn from "../../UI/BackBtn/BackBtn";
import MyDropDownBtn from "../../UI/MyDropDownBtn/MyDropDowmBtn";

const PublicCollectionMenu = ({ collection, addToMyCollection }) => {
  console.log(collection);

  const pageParam = useParams();

  const gameMenu = [
    {
      name: "Cards: question - answer",
      href: `/play_cards/pub/0/${pageParam.id}/${pageParam.name}`,
    },
    {
      name: " Cards: answer - question",
      href: `/play_cards/pub/1/${pageParam.id}/${pageParam.name}`,
    },
    {
      name: "Cards: time",
      href: `/play_timecard/pub/${pageParam.id}/${pageParam.name}`,
    },
    { name: "Divider", href: "" },
    {
      name: "Find pairs",
      href: `/play_pairs/pub/${pageParam.id}/${pageParam.name}`,
    },
    {
      name: "Find the right answer",
      href: `/play_test/pub/${pageParam.id}/${pageParam.name}`,
    },
    {
      name: "Write the right answer",
      href: `/play_write/pub/${pageParam.id}/${pageParam.name}`,
    },
  ];
  return (
    <div className="string_menu">
      {/* <h1 className="display-4 mss-4">{collectionContent.name}</h1> */}
      {/* <div className="d-flex  justify-content-between flex-row flex-wrap"> */}
      <div className="d-flex align-items-center">
        {" "}
        <div>
          <h1>{"Public collections / " + collection.name}</h1>
          {/* <p
            className="badge fst-italic bg-primary ms-1"
            style={{ fontSize: "1.1rem" }}>
            {collection.note}
          </p> */}
        </div>
        <p
          className="badge fst-italic bg-primary ms-1"
          style={{ fontSize: "1.1rem" }}>
          {collection.category}
        </p>
      </div>

      {/* className="d-flex   align-items-end justify-content-end pt-2" */}
      {/* <div className="d-flex   align-items-start  align-items-end justify-content-end "> */}

      <div>
        <ButtonGroup aria-label="delete and renaming buttons" size="lg">
          <MyDropDownBtn
            as={ButtonGroup}
            arr={gameMenu}
            title="PLAY GAMES"
            variant="primary"
          />
          <Button variant="primary" onClick={addToMyCollection}>
            Add to my collections
          </Button>
          <BackBtn />
        </ButtonGroup>
      </div>
      {/* </div> */}
    </div>
  );
};

export default PublicCollectionMenu;
