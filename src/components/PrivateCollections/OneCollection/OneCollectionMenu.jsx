import React, { useState } from "react";
import "../../../styles/collectMenu.scss";
import CollectionEditModal from "../OneCollectionActions/CollectionEditModal";
import ViewSwitch from "../../UI/tgb/ViewSwitch";
import OneCollectionBtns from "../../UI/tgb/OneCollectionBtns";
import BtnPlayMenu from "../../UI/PlayMenu/BtnPlayMenu";
import Sortbox from "../../UI/Sortbox";
import { sortByField } from "../../../utils/arraysFunc";

const OneCollectionMenu = (props) => {
  const [renameMode, setRenameMode] = useState(false);
  const changeCat = (cat) => {
    props.setCollect({
      ...props.colObj,
      collection: {
        ...props.colObj.collection,
        categoryid: cat.id ? cat.id : "",
        category: cat.name ? cat.name : "",
      },
    });
  };
  const sortContent = (val) => {
    const newVal = sortByField(
      [...props.content],
      val < 3 ? "question" : "answer",
      !(val % 2)
    );
    props.setContent(newVal);
  };
  return (
    <div className="string_menu">
      {renameMode && (
        <CollectionEditModal
          isEdit={renameMode}
          setIsEdit={setRenameMode}
          collection={props.colObj.collection}
          cancel={setRenameMode}
          changeCat={changeCat}
        />
      )}
      {/* <div className="d-flex align-items-center"></div>{" "} */}

      <div className="menufind">
        <div className="d-flex align-items-center">
          <BtnPlayMenu collection={props.colObj.collection} />
          <div className="d-flex">
            <div className="collectionNoteText">
              {props.colObj.collection.category && (
                <div className="cat"> {props.colObj.collection.category}</div>
              )}
            </div>
            <div className="name-collect" onClick={() => setRenameMode(true)}>
              <h1 className="pointer">{props.colObj.collection.name}</h1>{" "}
            </div>
          </div>
        </div>
        <div className="d-flex">
          <Sortbox
            options={["Questions", "Answers"]}
            onChange={(e) => sortContent(parseInt(e.target.value))}
          />
          <ViewSwitch
            checked={window.location.hash === "#1" ? 1 : 0}
            onChange={props.setMode}
          />
        </div>
        <div className="d-flex">
          <OneCollectionBtns
            colObj={props.colObj}
            setContent={props.setContent}
          />
        </div>
      </div>
      <div>
        {props.colObj.collection.note && (
          <div className="note">
            {"About collection: " + props.colObj.collection.note}{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default OneCollectionMenu;
