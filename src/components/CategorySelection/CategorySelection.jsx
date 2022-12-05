import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";
import BaseAPI from "../../API/BaseAPI";
import CategoriesListHeader from "./CategoriesListHeader";
import CategoryFilter from "./CategoryFilter";
import CategoryItems from "./CategoryItems";
import CategoryLink from "./CategoryLink";

const CategorySelection = ({
  onSelect,
  colCat = "",
  isPublic = false,
  isOne = false,
}) => {
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState(colCat);
  const router = useNavigate();
  const [getCategories, isLoadingCat] = useQuery(async () => {
    const cat = await BaseAPI.getCategoriesList(isPublic);
    setCategories(cat);
  });
  const addUserCategory = () => {
    BaseAPI.createCategory(filter);
    onSelectItem(filter);
    getCategories();
  };
  const onSelectItem = (item = "") => {
    setFilter("");
    setSelected(item);
    onSelect(item);
  };

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPublic]);

  return (
    <div>
      <Dropdown>
        <CategoriesListHeader
          selected={selected}
          list={categories}
          getList={getCategories}
          isPublic={isPublic}
          isOne={isOne}
        />
        <Dropdown.Menu style={{ width: "150px" }}>
          <CategoryFilter filter={filter} setFilter={setFilter} />
          {!filter && !selected && !isOne && (
            <Button
              className="text-primary fst-italic"
              style={{ fontSize: "0.77vw" }}
              variant="link"
              onClick={() => router("/collections/shared")}>
              🌀my shared collections
            </Button>
          )}
          {!isLoadingCat && categories && (
            <div>
              {!filter && selected && (
                <CategoryLink
                  onSelectItem={onSelectItem}
                  isPublic={isPublic}
                  isOne={isOne}
                />
              )}
              <CategoryItems
                add={addUserCategory}
                selected={selected}
                onSelect={onSelectItem}
                isPublic={isPublic}
                list={categories.filter(
                  (el) => !filter || el.name.toLowerCase().startsWith(filter)
                )}
              />
            </div>
          )}
        </Dropdown.Menu>
      </Dropdown>
      ,
    </div>
  );
};

export default CategorySelection;
