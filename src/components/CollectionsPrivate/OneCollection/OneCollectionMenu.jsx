import React, { useState } from "react";
import "../../../styles/collectMenu.scss";
import CollectionEditModal from "../OneCollectionActions/CollectionEditModal";
import OneCollectionBtns from "../../UI/tgb/OneCollectionBtns";
import { sortByField } from "../../../utils/arraysFunc";
import SortMenu from "../../UI/SortMenu/SortMenu";
import ToggleView from "../../UI/TogleView/ToggleView";
import { useNavigate } from "react-router-dom";
import { GO_TO } from "../../../router/routes";
import { saveSet } from "../../../utils/pageSettings";
import { FiSettings } from "react-icons/fi";
import GamesMenu from "../../UI/GamesMenu/GamesMenu";

const OneCollectionMenu = (props) => {
  const [renameMode, setRenameMode] = useState(false);
  const changeCat = (cat) => {
    props.setCollect({
      ...props.colObj.collection,
      categoryid: cat.id ? cat.id : "",
      category: cat.name ? cat.name : "",
    });
  };
  const sortContent = (val, isDec) => {
    const newVal = sortByField([...props.colObj.content], val, isDec);

    props.setContent(newVal);
  };
  const router = useNavigate();
  const ToCollections = () => {
    router(GO_TO.myCollect);
  };
  const toCat = () => {
    saveSet({
      "selectedCategorymy": {
        name: props.colObj.collection.category,
        id: props.colObj.collection.categoryid,
      },
    });
    router(GO_TO.myCollect);
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
          <div className="playmenu">
            <GamesMenu cardSet={props.colObj.collection} isBtnForm isVertical />
          </div>

          <div className="d-flex">
            <div className="name-collect">
              <h1 className="pointer">
                My library /
                <span className="pointer" onClick={ToCollections}>
                  Collections /
                </span>
                {props.colObj.collection.category && (
                  <span className="pointer" onClick={toCat}>
                    {props.colObj.collection.category} /
                  </span>
                )}
                <span className="colname" onClick={() => setRenameMode(true)}>
                  {props.colObj.collection.name}
                </span>
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
          <button
            data-title="Collections settings"
            className="viewBtn"
            onClick={() => setRenameMode(true)}>
            <span>
              <FiSettings />
            </span>
          </button>{" "}
          <OneCollectionBtns
            colObj={props.colObj}
            setContent={props.setContent}
          />
        </div>
      </div>
      <div>
        {props.colObj.collection.note && (
          <div className="note">
            {"About collection: " + props.colObj.collection.note}
          </div>
        )}
      </div>
    </div>
  );
};

export default OneCollectionMenu;