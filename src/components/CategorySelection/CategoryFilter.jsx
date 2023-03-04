import React from "react";
import { Button } from "react-bootstrap";
import MyInputGroup from "../UI/MyInput/MyInputGroup";

const CategoryFilter = ({ filter, setFilter }) => {
  return (
    <MyInputGroup
      onChange={(e) => setFilter(e.target.value.toLowerCase())}
      value={filter}
      placeholder="Type to filter...">
      <Button
        className="w-25"
        variant="outline-secondary"
        onClick={() => setFilter("")}>
        X
      </Button>
    </MyInputGroup>
  );
};
export default CategoryFilter;
