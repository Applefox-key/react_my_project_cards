import React from "react";
import { Dropdown } from "react-bootstrap";
import cl from "./CategorySelection.module.scss";
const CategoryLink = ({ onSelectItem, isPublic, isOne }) => {
  return (
    <Dropdown.Item
      className={cl.link}
      key={"first"}
      eventKey={"first"}
      onClick={() => {
        onSelectItem();
      }}>
      {isOne ? "...set no category ❌" : "...show all categories ♾️"}
    </Dropdown.Item>
  );
};

export default CategoryLink;
