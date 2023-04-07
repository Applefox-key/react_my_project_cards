import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useQuery } from "../../hooks/useQuery";
import BaseAPI from "../../API/BaseAPI";
import CategoriesListHeader from "./CategoriesListHeader";
import CategoryFilter from "./CategoryFilter";
import CategoryItems from "./CategoryItems";
import CategoryLink from "./CategoryLink";
import cl from "./CategorySelection.module.scss";

const CategorySelection = ({
  onSelect,
  colCat = "",
  isPublic = false,
  isOne = false,
}) => {
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState(colCat);

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
    <>
      <Dropdown className={cl.div_width}>
        <CategoriesListHeader
          className={cl.div_width}
          selected={selected}
          list={categories}
          getList={getCategories}
          isPublic={isPublic}
          isOne={isOne}
        />
        <Dropdown.Menu className={cl.div_width}>
          <CategoryFilter filter={filter} setFilter={setFilter} />

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
    </>
  );
};

export default CategorySelection;
