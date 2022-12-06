import React from "react";
import { Button } from "react-bootstrap";
import CategorySelection from "../CategorySelection/CategorySelection";
import MyFilter from "../UI/MyFilter";
import MyToggleBtnGroup from "../UI/MyToggleBtnGroup";

const CollectionsMenu = (props) => {
  return (
    <div className="string_menu d-flex justify-content-between mt-2">
      <div className="d-flex align-items-center">
        <h1 className="display-6">
          {props.isPublic ? "Public collections" : "My collections"}
        </h1>
        {!props.isPublic && (
          <div>
            <Button
              variant="link"
              style={{ color: "white" }}
              size="lg"
              onClick={() => props.setIsNew(!props.isNew)}>
              CREATE NEW
            </Button>
          </div>
        )}
      </div>{" "}
      <div></div>
      <div className="d-flex align-items-center justify-content-end me-2">
        <MyToggleBtnGroup
          checked={window.location.hash === "#1" ? 1 : 0}
          arr={["cards", "table"]}
          // arr={["🖹", "🗊"]}
          onChange={props.viewmodeChange}
          name="view"
          size="lg"
        />{" "}
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
