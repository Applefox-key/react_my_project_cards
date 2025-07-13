import React, { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../../styles/collectMenu.scss";

import CollectionEditModal from "../UserCollectionActions/CollectionEditModal";
import OneCollectionBtns from "../../UI/tgb/OneCollectionBtns";
import CollectionPagePath from "../../UI/CollectionPagePath";
import ToggleView from "../../UI/TogleView/ToggleView";
import SortMenu from "../../UI/SortMenu/SortMenu";

import { FiSettings } from "react-icons/fi";

import { sortByField } from "../../../utils/arraysFunc";
import { saveSet } from "../../../utils/pageSettings";
import GamesMenu from "../../UI/GamesMenu/GamesMenu";
import { GO_TO } from "../../../router/routes";
import { useIsMobileMenu } from "../../../hooks/useIsMobileMenu";
import { TbMenuOrder } from "react-icons/tb";

const OneCollectionMenu = ({ modes, collectionData }) => {
  const { setMode, setReorgMode } = modes;
  const [isMobile, menuOpen, toggleMenu] = useIsMobileMenu();
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
    <div className="sticky-top">
      <div className="string_menu string-bread">
        <div className="name-collect">
          <CollectionPagePath
            list={menuOpen ? arrPath : [arrPath[arrPath.length - 1]]}
          />
        </div>
        {menuOpen && collection.note && (
          <div className="note">{"About collection: " + collection.note}</div>
        )}
      </div>

      <div className="string_menu">
        {renameMode && (
          <CollectionEditModal
            setIsEdit={setRenameMode}
            {...{ collection, changeAttr, setReorgMode }}
          />
        )}
        <div className="menufind">
          {menuOpen && (
            <div className="one-collect-btn-box">
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
          )}
          <div className="view-settings width150">
            {isMobile && (
              <button className="mobile-menu" onClick={toggleMenu}>
                <TbMenuOrder />
              </button>
            )}
            <div className="playmenu">
              <GamesMenu cardSet={collection} isBtnForm isVertical />
            </div>
            <ToggleView
              checked={window.location.hash === "#1" ? 1 : 0}
              onChange={setMode}
            />
            <SortMenu
              fields={[
                { value: "question", label: "Questions" },
                { value: "answer", label: "Answers" },
              ]}
              onSelect={sortContent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneCollectionMenu;
