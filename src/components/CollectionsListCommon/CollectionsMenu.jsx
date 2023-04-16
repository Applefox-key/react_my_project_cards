import React from "react";
import { Button } from "react-bootstrap";
import { HiShare, HiHeart, HiPlus } from "react-icons/hi";
import MyFilter from "../UI/MyFilter/MyFilter";

import "../../styles/collectMenu.scss";
import CategorySelection from "../CategorySelection/CategorySelection";
import TGB from "../UI/tgb/TGB";

const CollectionsMenu = (props) => {
  const isPublic = window.location.pathname.includes("pub");
  const filter = (field) => {
    props.setOnlySharedFav({
      ...props.onlySharedFav,
      [field]: !props.onlySharedFav[field],
    });
  };
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
              <div className="inputCheck">
                <input
                  id="onlySharedInput"
                  type="checkbox"
                  value={props.onlySharedFav.shared}
                  onChange={() => filter("shared")}
                />
                <label htmlFor="onlySharedInput">
                  show only shared
                  <span>{props.onlySharedFav.shared && <HiShare />}</span>
                </label>
              </div>
              <div className="inputCheck">
                <input
                  id="onlyFavInput"
                  type="checkbox"
                  value={props.onlySharedFav.favorite}
                  onChange={() => filter("favorite")}
                />
                <label htmlFor="onlyFavInput">
                  show only favorite
                  <span className="heart">
                    {props.onlySharedFav.favorite && <HiHeart />}
                  </span>
                </label>
              </div>
              <div className="divider mb-2 mt-2"></div>
              <Button
                onClick={() => props.setIsNew(!props.isNew)}
                size="lg"
                className="menuBtn mt-1 mb-1"
                variant="light">
                Create new set <HiPlus />
              </Button>
            </>
          )}{" "}
          <div className="select_wrap w-auto">
            <CategorySelection
              onSelect={props.setselectedCategory}
              colCat={props.selectedCategory}
              isPublic={isPublic}
            />{" "}
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default CollectionsMenu;
