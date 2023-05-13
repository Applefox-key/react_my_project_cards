import React from "react";
import cl from "./CategorySelection.module.scss";
const CategoryFilter = ({ filter, setFilter }) => {
  return (
    <div className={cl.filter_input}>
      <input
        type="text"
        onChange={(e) => setFilter(e.target.value.toLowerCase())}
        value={filter}
        placeholder="type to filter or adding..."
      />
      {filter && (
        <div
          className={cl.filter_btn}
          variant="outline-light"
          onClick={() => setFilter("")}>
          ❌
        </div>
      )}
    </div>
  );
};
export default CategoryFilter;
