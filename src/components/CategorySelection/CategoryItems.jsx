import React from "react";
import cl from "./CategorySelection.module.scss";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
const CategoryItems = ({ list, add, selected, onSelect, isPublic }) => {
  const classGenerator = (item) => {
    const active_id = !selected ? "" : isPublic ? selected.name : selected.id;
    const item_id = isPublic ? item.name : item.id;

    return [
      cl["drop-item"],
      active_id === item_id ? cl["active"] : "",
      "fs-4",
    ].join(" ");
  };
  return (
    <>
      {list.length ? (
        list.map((item) => (
          <DropdownItem
            className={classGenerator(item)}
            key={item.id}
            onClick={() => {
              onSelect(item);
            }}>
            {item.name}
          </DropdownItem>
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
