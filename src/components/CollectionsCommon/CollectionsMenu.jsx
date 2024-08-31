import React from "react";
import "../../styles/collectMenu.scss";
import { fragment_SearchingTips } from "../../utils/pagesFragments";
import ByCategoryBtn from "../UI/tgb/ByCategoryBtn";
import BackMenuBtn from "../UI/tgb/BackMenuBtn";
import { HiHeart, HiPlus, HiShare } from "react-icons/hi";
import FilterByCategory from "../CategorySelection/FilterByCategory";
import ToggleView from "../UI/TogleView/ToggleView";
import SortMenu from "../UI/SortMenu/SortMenu";
import { useNavigate } from "react-router-dom";
import { GO_TO } from "../../router/routes";
import { FiSettings } from "react-icons/fi";
import CollectionPagePath from "../UI/CollectionPagePath";

const CollectionsMenu = (props) => {
  const isPublic = window.location.pathname.includes("pub");

  const sortContent = (field, isDec) => {
    props.setSettingsCommon("sorting", { field, isDec });
  };
  const router = useNavigate();

  const ToCollections = () => {
    if (props.commonSettings.byCategory) {
      props.setSettingsCommon("byCategory");
      return;
    }
    if (!isPublic && !!props.commonSettings.selectedCategorymy) {
      props.setSettingsCommon("selectedCategorymy", "");
      return;
    }
    if (isPublic && !!props.commonSettings.selectedCategorypub) {
      props.setSettingsCommon("selectedCategorypub", "");
      return;
    }
  };
  const arrPath = (() => {
    const res = [];
    if (isPublic) res.push({ name: "Public library", action: null });
    else res.push({ name: "My library", action: () => router("/myLibrary") });
    res.push({ name: "Collections", action: ToCollections });
    if (props.commonSettings.byCategory)
      res.push({ name: "Categories", action: ToCollections });
    if (!isPublic && !!props.commonSettings.selectedCategorymy)
      res.push({
        name: props.commonSettings.selectedCategorymy.name,
        action: null,
      });
    if (isPublic && !!props.commonSettings.selectedCategorypub)
      res.push({
        name: props.commonSettings.selectedCategorypub.name,
        action: null,
      });
    return res;
  })();
  return (
    <div>
      <div className="string_menu">
        <div className="menufind">
          <div className="d-flex align-items-center">
            <CollectionPagePath list={arrPath} />
          </div>
          <div className="view-settings">
            <ToggleView
              checked={window.location.hash === "#1" ? 1 : 0}
              onChange={props.viewmodeChange}
            />{" "}
            <SortMenu
              fields={[
                { value: "name", label: "Name" },
                { value: "category", label: "Category" },
              ]}
              onSelect={sortContent}
            />
            <div className="buttonBox">
              <ByCategoryBtn
                className="viewBtn"
                commonSettings={props.commonSettings}
                setSettingsCommon={props.setSettingsCommon}
              />{" "}
            </div>
            <div
              className={
                (isPublic && !!props.commonSettings.selectedCategorypub) ||
                (!isPublic && !!props.commonSettings.selectedCategorymy)
                  ? "active-border"
                  : ""
              }>
              <FilterByCategory
                onSelect={(val) =>
                  props.setSettingsCommon(
                    isPublic ? "selectedCategorypub" : "selectedCategorymy",
                    val
                  )
                }
                colCatPub={props.commonSettings.selectedCategorypub}
                colCat={props.commonSettings.selectedCategorymy}
              />
            </div>
          </div>
          <div>
            <div className="d-flex lign-items-center">
              <div className="buttonBox">
                {!isPublic && !props.commonSettings.byCategory && (
                  <>
                    <button
                      className={
                        props.privateSettings.shared
                          ? "viewBtn checked"
                          : "viewBtn"
                      }
                      data-title="show only shared"
                      onClick={() => props.setSettingsPrivat("shared")}>
                      <HiShare />
                    </button>
                    <button
                      className={
                        props.privateSettings.favorite
                          ? "viewBtn checked"
                          : "viewBtn"
                      }
                      data-title="show only favorite"
                      onClick={() => props.setSettingsPrivat("favorite")}>
                      <HiHeart />
                    </button>
                  </>
                )}
              </div>

              {!isPublic && !props.commonSettings.byCategory && (
                <>
                  <button
                    className="viewBtn"
                    data-title="Create new set"
                    onClick={() => props.setSettingsPrivat("isNew")}>
                    <HiPlus />
                  </button>
                </>
              )}
              {!isPublic && props.commonSettings.byCategory && (
                <button
                  data-title="Categories manager"
                  className="viewBtn"
                  onClick={() => router(GO_TO.categoriesManager)}>
                  <span>
                    <FiSettings />
                  </span>
                </button>
              )}
              <BackMenuBtn />
            </div>
          </div>
        </div>
      </div>{" "}
      {fragment_SearchingTips(
        props.commonSettings,
        props.privateSettings,
        props.setSettingsCommon,
        props.setSettingsPrivat
      )}
    </div>
  );
};

export default CollectionsMenu;
