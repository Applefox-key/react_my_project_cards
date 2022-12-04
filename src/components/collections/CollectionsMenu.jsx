import React from "react";
import { Button } from "react-bootstrap";
import CategorySelection from "../CategorySelection/CategorySelection";
import MyFilter from "../UI/MyFilter";
import ToggleBtnGroup from "../UI/ToggleBtnGroup";

const CollectionsMenu = (props) => {
  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex">
        <div className="mt-2">
          <ToggleBtnGroup
            checked={window.location.hash === "#2" ? 2 : 1}
            arr={["cards", "table"]}
            onChange={props.viewmodeChange}
            name="view"
            size="lg"
          />{" "}
        </div>
        <h1 className="display-6 mt-2">
          {props.isPublic ? "Public collections" : "My collections"}
        </h1>
        {!props.isPublic && (
          <div className="mt-2">
            <Button
              variant="link"
              size="lg"
              onClick={() => props.setIsNew(!props.isNew)}>
              CREATE NEW
            </Button>
          </div>
        )}
      </div>
      {(props.selectedCategory || props.filter) && (
        <div className="fs-4 mt-2 fst-italic">
          Search results for {props.selectedCategory && " category..."}
          <span className="text-primary">{props.selectedCategory.name}</span>
          {props.filter && " text..."}
          <span className="text-primary">{props.filter.toString()}</span>
        </div>
      )}

      <div className="d-flex mt-2  ">
        <CategorySelection
          onSelect={props.setselectedCategory}
          colCat={props.selectedCategory}
          isPublic={props.isPublic}
        />
        <MyFilter filter={props.filter} setFilter={props.setFilter} />
      </div>
    </div>
  );
};

export default CollectionsMenu;
