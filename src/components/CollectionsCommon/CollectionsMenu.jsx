import React from "react";
import MyFilter from "../UI/MyFilter/MyFilter";
import "../../styles/collectMenu.scss";
import { fragment_SearchingTips } from "../../utils/pagesFragments";
import ViewSwitch from "../UI/tgb/ViewSwitch";
import ByCategoryBtn from "../UI/tgb/ByCategoryBtn";
import BackMenuBtn from "../UI/tgb/BackMenuBtn";
import SidebarShowBtn from "../UI/tgb/SidebarShowBtn";
import { HiHeart, HiPlus, HiShare } from "react-icons/hi";
import { Form } from "react-bootstrap";

const CollectionsMenu = (props) => {
  const isPublic = window.location.pathname.includes("pub");

  return (
    <div className="string_menu d-flex justify-content-between">
      {/* <div className="d-flex align-items-center"></div>{" "} */}
      <div className="menufind">
        <div className="d-flex align-items-center">
          <SidebarShowBtn
            data-title=" select a category"
            onClick={() =>
              props.setSettingsCommon("sideBar", !props.commonSettings.sideBar)
            }
            sideBar={props.commonSettings.sideBar}
          />
          <h1>
            {isPublic ? "Public collections" : "My library"}
            {props.commonSettings.byCategory ? ": CATEGORIES" : ""}
          </h1>{" "}
        </div>{" "}
        <MyFilter
          filter={props.commonSettings.filter}
          setFilter={(val) => props.setSettingsCommon("filter", val)}
        />{" "}
        <div>
          <div className="d-flex">
            {!props.commonSettings.byCategory && (
              <Form.Select
                size="sm"
                onChange={(e) =>
                  props.setSettingsCommon("sorting", parseInt(e.target.value))
                }
                aria-label="Default select example"
                className="wsort m-auto">
                <option>Sort</option>
                <option value="1">Name A-Z</option>
                <option value="2">Name Z-A </option>
                <option value="3">Category A-Z</option>
                <option value="4">Category Z-A</option>
              </Form.Select>
            )}
            <Form.Select
              size="sm"
              onChange={(e) =>
                props.setSettingsCommon("sorting", parseInt(e.target.value))
              }
              aria-label="Default select example"
              className="wsort m-auto">
              <option>Category</option>
              <option value="1">Name A-Z</option>
              <option value="2">Name Z-A </option>
              <option value="3">Category A-Z</option>
              <option value="4">Category Z-A</option>
            </Form.Select>
            <ViewSwitch
              checked={window.location.hash === "#1" ? 1 : 0}
              onChange={props.viewmodeChange}
            />{" "}
            <ByCategoryBtn
              commonSettings={props.commonSettings}
              setSettingsCommon={props.setSettingsCommon}
            />{" "}
            {!isPublic && !props.commonSettings.byCategory && (
              <>
                <button
                  className={
                    props.privateSettings.shared ? "viewBtn checked" : "viewBtn"
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
      </div>

      {fragment_SearchingTips(
        props.commonSettings,
        props.privateSettings,
        props.setSettingsCommon
      )}
    </div>
  );
};

export default CollectionsMenu;
