import React from "react";
import { Button } from "react-bootstrap";
import { HiShare, HiHeart, HiPlus } from "react-icons/hi";
import { RiFoldersFill } from "react-icons/ri";
import MyFilter from "../UI/MyFilter/MyFilter";

import "../../styles/collectMenu.scss";
import CategorySelection from "../CategorySelection/CategorySelection";
import TGB from "../UI/tgb/TGB";

const CollectionsMenu = (props) => {
  const isPublic = window.location.pathname.includes("pub");

  return (
    <div className="string_menu d-flex justify-content-between mt-2">
      <div className="d-flex align-items-center"></div>{" "}
      <div className="menufind">
        <h1 className="menu-title">
          {isPublic ? "Public collections" : "My collections"}
        </h1>
        <MyFilter
          filter={props.commonSettings.filter}
          setFilter={(val) => props.setSettingsCommon("filter", val)}
        />
        <TGB
          checked={window.location.hash === "#1" ? 1 : 0}
          onChange={props.viewmodeChange}
        />
      </div>
      <div className="box_menu">
        <div className="actionMenu">
          <div className="inputCheck">
            <input
              id="byCategory"
              type="checkbox"
              value={props.commonSettings.byCategory}
              onChange={() =>
                props.setSettingsCommon(
                  "byCategory",
                  !props.commonSettings.byCategory
                )
              }
            />
            <label htmlFor="byCategory">
              show by categories
              <span>
                {props.commonSettings.byCategory && <RiFoldersFill />}
              </span>
            </label>
          </div>
          {!isPublic && !props.commonSettings.byCategory && (
            <>
              <div className="inputCheck">
                <input
                  id="onlySharedInput"
                  type="checkbox"
                  value={props.privateSettings.shared}
                  onChange={() => props.setSettingsPrivat("shared")}
                />
                <label htmlFor="onlySharedInput" className="pe-3">
                  show only shared
                  <span>{props.privateSettings.shared && <HiShare />}</span>
                </label>
              </div>
              <div className="inputCheck">
                <input
                  id="onlyFavInput"
                  type="checkbox"
                  value={props.privateSettings.favorite}
                  onChange={() => props.setSettingsPrivat("favorite")}
                />
                <label htmlFor="onlyFavInput">
                  show only favorite
                  <span className="heart">
                    {props.privateSettings.favorite && <HiHeart />}
                  </span>
                </label>
              </div>
              <div className="divider mb-2 mt-2"></div>
              <Button
                onClick={() => props.setSettingsPrivat("isNew")}
                size="lg"
                className="menuBtn mt-1 mb-1"
                variant="light">
                Create new set <HiPlus />
              </Button>
            </>
          )}
          {!props.commonSettings.byCategory && (
            <div className="select_wrap w-auto">
              <CategorySelection
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
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionsMenu;
