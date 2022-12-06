import React from "react";
import CategorySelection from "../CategorySelection/CategorySelection";
import MyFilter from "../UI/MyFilter";
import MyToggleBtnGroup from "../UI/MyToggleBtnGroup";

const CollectionsMenu = (props) => {
  return (
    <div className="string_menu d-flex justify-content-between mt-2">
      <div className="d-flex align-items-center">
        <h1>{props.isPublic ? "Public collections" : "My collections"}</h1>
        {!props.isPublic && (
          <p
            className="badge fst-italic bg-primary ms-1 pointer"
            style={{ fontSize: "1.1rem" }}
            onClick={() => props.setIsNew(!props.isNew)}>
            CREATE NEW
          </p>
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
