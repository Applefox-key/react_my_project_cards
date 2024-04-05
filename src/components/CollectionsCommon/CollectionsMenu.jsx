import React from "react";
import MyFilter from "../UI/MyFilter/MyFilter";
import "../../styles/collectMenu.scss";
import { fragment_SearchingTips } from "../../utils/pagesFragments";
import ByCategoryBtn from "../UI/tgb/ByCategoryBtn";
import BackMenuBtn from "../UI/tgb/BackMenuBtn";
import { HiHeart, HiPlus, HiShare } from "react-icons/hi";
import FilterByCategory from "../CategorySelection/FilterByCategory";
import ToggleView from "../UI/TogleView/ToggleView";
import SortMenu from "../UI/SortMenu/SortMenu";

const CollectionsMenu = (props) => {
  const isPublic = window.location.pathname.includes("pub");
  const sortContent = (field, isDec) => {
    props.setSettingsCommon("sorting", { field, isDec });
  };
  return (
    <div>
      <div className="string_menu">
        {/* <div className="d-flex align-items-center"></div>{" "} */}
        <div className="menufind">
          <div className="d-flex align-items-center">
            <h1>
              {isPublic ? "Public library" : "My library"}
              <span>
                {props.commonSettings.byCategory
                  ? " / Collections/ Categories"
                  : " / Collections"}
              </span>
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
            {/* <FilterByCategory
              onSelect={(val) =>
                props.setSettingsCommon(
                  isPublic ? "selectedCategorypub" : "selectedCategorymy",
                  val
                )
              }
              colCatPub={props.commonSettings.selectedCategorypub}
              colCat={props.commonSettings.selectedCategorymy}
            /> */}
          </div>{" "}
          <MyFilter
            filter={props.commonSettings.filter}
            setFilter={(val) => props.setSettingsCommon("filter", val)}
          />{" "}
          <div>
            <div className="d-flex lign-items-center">
              {/* <FilterByCategory
                onSelect={(val) =>
                  props.setSettingsCommon(
                    isPublic ? "selectedCategorypub" : "selectedCategorymy",
                    val
                  )
                }
                colCatPub={props.commonSettings.selectedCategorypub}
                colCat={props.commonSettings.selectedCategorymy}
              /> */}
              <ByCategoryBtn
                commonSettings={props.commonSettings}
                setSettingsCommon={props.setSettingsCommon}
              />{" "}
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
                  <button
                    className="viewBtn"
                    data-title="Create new set"
                    onClick={() => props.setSettingsPrivat("isNew")}>
                    <HiPlus />
                  </button>
                </>
              )}
              <BackMenuBtn />
            </div>
          </div>
          <div className="view-settings">
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
          </div>
        </div>
      </div>{" "}
      {fragment_SearchingTips(
        props.commonSettings,
        props.privateSettings,
        props.setSettingsCommon
      )}
    </div>
  );
};

export default CollectionsMenu;
