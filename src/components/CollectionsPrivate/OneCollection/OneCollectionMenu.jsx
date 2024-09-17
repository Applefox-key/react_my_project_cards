import React, { useCallback, useMemo, useState } from "react";
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
import CollectionPagePath from "../../UI/CollectionPagePath";

const OneCollectionMenu = ({ modes, collectionData }) => {
  const { setMode, setReorgMode } = modes;
  const { collection, content, setContent, setCollect } = collectionData;
  const [renameMode, setRenameMode] = useState(false);

  const changeAttr = (atrKeyVal) => {
    let changes = {};
    if (atrKeyVal.category) {
      changes = {
        categoryid: atrKeyVal.category.id || "",
        category: atrKeyVal.category.name || "",
      };
    }
    if ("note" in atrKeyVal) changes.note = atrKeyVal.note;
    setCollect((prev) => ({ ...prev, ...changes }));
  };
  const sortContent = (val, isDec) => {
    const newVal = sortByField([...content], val, isDec);

    collectionData.setContent(newVal);
  };
  const router = useNavigate();

  // Callback functions to prevent re-creation on each render
  const toCollections = useCallback(() => {
    router(GO_TO.myCollect);
  }, [router]);

  const toLibrary = useCallback(() => {
    router(GO_TO.library);
  }, [router]);

  const toCat = useCallback(() => {
    saveSet({
      "selectedCategorymy": {
        name: collection.category,
        id: collection.categoryid,
      },
    });
    router(GO_TO.myCollect);
  }, [collection.category, collection.categoryid, router]);

  const arrPath = useMemo(() => {
    const res = [
      { name: "My library", action: toLibrary },
      { name: "Collections", action: toCollections },
    ];

    if (collection.category) {
      res.push({ name: collection.category, action: toCat });
    }

    res.push({
      name: `${collection.name} (${content.length})`,
      action: () => setRenameMode(true),
      cl: "colname",
    });
    return res;
  }, [collection, content.length, toLibrary, toCollections, toCat]);

  return (
    <div className="string_menu">
      {renameMode && (
        <CollectionEditModal
          setIsEdit={setRenameMode}
          {...{ collection, changeAttr, setReorgMode }}
        />
      )}

      <div className="menufind">
        <div className="name-collect">
          <CollectionPagePath list={arrPath} />
        </div>
        <div className="view-settings width150">
          <div className="playmenu">
            <GamesMenu cardSet={collection} isBtnForm isVertical />
          </div>
          <ToggleView
            checked={window.location.hash === "#1" ? 1 : 0}
            onChange={setMode}
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
          </button>
          <OneCollectionBtns
            colObj={{ collection: collection, content: content }}
            setContent={setContent}
          />
        </div>
      </div>
      <div>
        {collection.note && (
          <div className="note">{"About collection: " + collection.note}</div>
        )}
      </div>
    </div>
  );
};

export default OneCollectionMenu;
