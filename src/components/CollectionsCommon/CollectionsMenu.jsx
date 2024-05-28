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

const CollectionsMenu = (props) => {
  const isPublic = window.location.pathname.includes("pub");
  const sortContent = (field, isDec) => {
    props.setSettingsCommon("sorting", { field, isDec });
  };
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
  const router = useNavigate();
  return (
    <div>
      <div className="string_menu">
        {/* <div className="d-flex align-items-center"></div>{" "} */}
        <div className="menufind">
          <div className="d-flex align-items-center">
            <h1>
              {isPublic ? (
                "Public library"
              ) : (
                <span className="pointer" onClick={() => router("/myLibrary")}>
                  My library
                </span>
              )}
              <span className="pointer" onClick={ToCollections}>
                / Collections
              </span>
              {props.commonSettings.byCategory && <span> / Categories </span>}
              <span>
                {!isPublic && !!props.commonSettings.selectedCategorymy
                  ? " / " + props.commonSettings.selectedCategorymy.name
                  : ""}
              </span>
              <span>
                {isPublic && !!props.commonSettings.selectedCategorypub
                  ? " / " + props.commonSettings.selectedCategorypub.name
                  : ""}
              </span>
            </h1>
          </div>{" "}
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
            <FilterByCategory
              onSelect={(val) =>
                props.setSettingsCommon(
                  isPublic ? "selectedCategorypub" : "selectedCategorymy",
                  val
                )
              }
              colCatPub={props.commonSettings.selectedCategorypub}
              colCat={props.commonSettings.selectedCategorymy}
            />{" "}
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
