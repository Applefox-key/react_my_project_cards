import React from "react";
import "../../styles/collectMenu.scss";
import OnePbCollectionBtns from "../UI/tgb/OnePbCollectionBtns";
import ToggleView from "../UI/TogleView/ToggleView";
import SortMenu from "../UI/SortMenu/SortMenu";
import { useNavigate } from "react-router-dom";
import { GO_TO } from "../../router/routes";
import { saveSet } from "../../utils/pageSettings";
import GamesMenu from "../UI/GamesMenu/GamesMenu";
import CollectionPagePath from "../UI/CollectionPagePath";

const PublicCollectionMenu = (props) => {
  const router = useNavigate();
  const toCat = () => {
    saveSet({
      "selectedCategorypub": {
        name: props.collection.category,
        id: props.collection.categoryid,
      },
    });
    router(GO_TO.pubCollect);
  };
  const arrPath = (() => {
    const res = [
      { name: " Public library ", action: null },
      {
        name: "Colections",
        action: (e) => router(GO_TO.pubCollect + window.location.hash),
      },
    ];
    if (props.collection.category)
      res.push({ name: props.collection.category, action: toCat });
    res.push({ name: props.collection.name, action: null });
    return res;
  })();
  return (
    <div className="string_menu">
      <div className="menufind">
        <div className="name-collect">
          <CollectionPagePath list={arrPath} />
        </div>
        <div className="view-settings width150">
          <GamesMenu cardSet={props.collection} isBtnForm isVertical />
          <ToggleView
            checked={window.location.hash === "#1" ? 1 : 0}
            onChange={props.setMode}
          />
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
