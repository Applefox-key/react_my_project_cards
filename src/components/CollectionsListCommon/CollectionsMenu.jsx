import React from "react";
import { Button } from "react-bootstrap";
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
        <MyFilter filter={props.filter} setFilter={props.setFilter} />
        <TGB
          checked={window.location.hash === "#1" ? 1 : 0}
          onChange={props.viewmodeChange}
        />
      </div>
      <div className="box_menu">
        <div className="actionMenu">
          {!isPublic && (
            <>
              <div className="inputCheckBox">
                <input
                  id="onlySharedInput"
                  type="checkbox"
                  value={props.onlyShared}
                  onChange={() => props.setOnlyShared(!props.onlyShared)}
                />
                <label htmlFor="onlySharedInput">
                  show only shared
                  <span />
                </label>
              </div>{" "}
              <Button
                onClick={() => props.setIsNew(!props.isNew)}
                size="lg"
                className="menuBtn mt-1 mb-1"
                variant="light">
                CREATE NEW
              </Button>
            </>
          )}{" "}
          <div className="select_wrap">
            <CategorySelection
              onSelect={props.setselectedCategory}
              colCat={props.selectedCategory}
              isPublic={isPublic}
            />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsMenu;
