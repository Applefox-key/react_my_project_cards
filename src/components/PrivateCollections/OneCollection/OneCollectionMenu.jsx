import React, { useState } from "react";
import "../../../styles/collectMenu.scss";
import CollectionEditModal from "../OneCollectionActions/CollectionEditModal";
import OneCollectionBtns from "../../UI/tgb/OneCollectionBtns";
import BtnPlayMenu from "../../UI/PlayMenu/BtnPlayMenu";
import { sortByField } from "../../../utils/arraysFunc";
import SortMenu from "../../UI/SortMenu/SortMenu";
import ToggleView from "../../UI/TogleView/ToggleView";

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
  const sortContent = (val, isDec) => {
    const newVal = sortByField([...props.colObj.content], val, isDec);

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

      <div className="menufind">
        <div className="d-flex align-items-center">
          <BtnPlayMenu collection={props.colObj.collection} />

          <div className="d-flex">
            <div className="name-collect" onClick={() => setRenameMode(true)}>
              <h1 className="pointer">
                My library /
                {props.colObj.collection.category
                  ? props.colObj.collection.category + " / "
                  : ""}
                {props.colObj.collection.name}
              </h1>{" "}
            </div>
          </div>
        </div>
        <div className="view-settings width150">
          <ToggleView
            checked={window.location.hash === "#1" ? 1 : 0}
            onChange={props.setMode}
          />{" "}
          <SortMenu
            fields={[
              { value: "question", label: "Questions" },
              { value: "answer", label: "Answers" },
            ]}
            onSelect={sortContent}
          />
        </div>
        <div className="d-flex position-relative">
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
