import React from "react";
import { Button } from "react-bootstrap";
import MyInputGroup from "../UI/MyInput/MyInputGroup";
import cl from "./CategorySelection.module.scss";
const CategoryFilter = ({ filter, setFilter }) => {
  return (
    <MyInputGroup
      classgroup={cl.filter_input}
      onChange={(e) => setFilter(e.target.value.toLowerCase())}
      value={filter}
      placeholder="type to filter...">
      {filter && (
        <Button
          className={cl.filter_btn}
          variant="outline-light"
          onClick={() => setFilter("")}>
          ❌
        </Button>
      )}
    </MyInputGroup>
  );
};
export default CategoryFilter;
