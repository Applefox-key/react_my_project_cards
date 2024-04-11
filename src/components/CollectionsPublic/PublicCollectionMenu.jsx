import React from "react";
import "../../styles/collectMenu.scss";
import OnePbCollectionBtns from "../UI/tgb/OnePbCollectionBtns";
import ToggleView from "../UI/TogleView/ToggleView";
import SortMenu from "../UI/SortMenu/SortMenu";
import { useNavigate } from "react-router-dom";
import { GO_TO } from "../../router/routes";
import { saveSet } from "../../utils/pageSettings";
import GamesMenu from "../UI/GamesMenu/GamesMenu";

const PublicCollectionMenu = (props) => {
  const router = useNavigate();
  const toCat = () => {
    saveSet({
      "selectedCategorypub": {
        name: props.collection.category,
        id: props.collection.categoryid,
      },
    });
    router(GO_TO.myCollect);
  };
  return (
    <div className="string_menu">
      <div className="d-flex align-items-center"></div>{" "}
      <div className="menufind">
        <div className="d-flex align-items-center">
          <GamesMenu cardSet={props.collection} isBtnForm isVertical />
          <div className="d-flex">
            <div className="name-collect">
              <span>Public library /</span>
              <span
                className="pointer"
                onClick={(e) =>
                  router(GO_TO.pubCollect + window.location.hash)
                }>
                Colections /
              </span>

              {props.collection.category && (
                <span className="pointer" onClick={toCat}>
                  {props.collection.category} /{" "}
                </span>
              )}
              <span> {props.collection.name}</span>
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
            onSelect={props.sortContent}
          />
        </div>
        <div className="d-flex">
          <OnePbCollectionBtns
            collection={props.collection}
            addToMyCollection={props.addToMyCollection}
          />
        </div>
      </div>
      {props.collection.note
        ? "About collection: " + props.collection.note
        : ""}
    </div>
  );
};

export default PublicCollectionMenu;
