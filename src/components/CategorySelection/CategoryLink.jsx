import React from "react";
import { Dropdown } from "react-bootstrap";

const CategoryLink = ({ onSelectItem, isPublic, isOne }) => {
  return (
    <Dropdown.Item
      style={{ fontSize: "1.5rem" }}
      className="text-primary fst-italic"
      key={"first"}
      eventKey={"first"}
      onClick={() => {
        onSelectItem();
        // if (linkParam.act) linkParam.act();
      }}>
      {isOne
        ? "...set no category"
        : isPublic
        ? "...show all categories"
        : "...show all categories"}
    </Dropdown.Item>
  );
};

export default CategoryLink;
