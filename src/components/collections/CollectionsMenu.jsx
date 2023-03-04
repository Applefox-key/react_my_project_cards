import React from "react";
import { Button } from "react-bootstrap";
import CategorySelection from "../CategorySelection/CategorySelection";
import MyFilter from "../UI/MyFilter";
import MyToggleBtnGroup from "../UI/MyToggleBtnGroup";

const CollectionsMenu = (props) => {
  return (
    <div className="string_menu d-flex justify-content-between mt-2">
      <div className="d-flex align-items-center">
        <h1>{props.isPublic ? "Public collections" : "My collections"}</h1>
      </div>{" "}
      <div></div>
      <div className="d-flex align-items-center justify-content-end me-2">
        <MyToggleBtnGroup
          className="togglegroup"
          checked={window.location.hash === "#1" ? 1 : 0}
          arr={["cards", "table"]}
          onChange={props.viewmodeChange}
          name="view"
          size="lg"
        />
        {!props.isPublic && (
          <Button
            onClick={() => props.setIsNew(!props.isNew)}
            className="menuBtn"
            variant="primary"
            style={{ fontSize: "1.1rem", width: "10rem", hieght: "7rem" }}>
            CREATE NEW
          </Button>
        )}
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
