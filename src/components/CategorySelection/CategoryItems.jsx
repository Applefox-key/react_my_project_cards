import React from "react";
import cl from "./CategorySelection.module.scss";
const CategoryItems = ({ list, add, selected, onSelect, isPublic }) => {
  return (
    <>
      {list.length ? (
        list.map((item) => (
          <div
            style={{ fontSize: "1.5rem" }}
            className={cl["drop-item"]}
            active={selected.id === item.id}
            key={item.id}
            eventKey={item.id}
            onClick={() => {
              onSelect(item);
            }}>
            {item.name}
          </div>
        ))
      ) : isPublic ? (
        <></>
      ) : (
        <div className={cl["add-cat-btn"]} variant="light" onClick={add}>
          + add new category
        </div>
      )}
    </>
  );
};

export default CategoryItems;
