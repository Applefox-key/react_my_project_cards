import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useQuery } from "../../hooks/useQuery";
import BaseAPI from "../../API/BaseAPI";
import CategoryFilter from "./CategoryFilter";
import CategoryItems from "./CategoryItems";
import CategoryLink from "./CategoryLink";
import cl from "./CategorySelection.module.scss";
import CategorySetBtn from "./CategorySetBtn";

const CategorySelection = ({
  onSelect,
  colCat = "",
  isPublic = false,
  isOne = false,
}) => {
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState(colCat);
  const [mode, setMode] = useState(false);
  const [getCategories, isLoadingCat] = useQuery(async () => {
    const cat = await BaseAPI.getCategoriesList(isPublic);
    setCategories(cat);
  });
  const addUserCategory = () => {
    BaseAPI.createCategory(filter);
    onSelectItem(filter, 0);
    getCategories();
  };
  const onSelectItem = (value = "", close = 1) => {
    setFilter("");
    setSelected(value);
    onSelect(value);
    if (!close) return;
    setMode(false);
  };

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPublic]);
  console.log(!!isPublic && mode);

  return (
    <div className="w-100">
      <Dropdown
        className={[cl.div_width, "ps-0 pe-0"].join(" ")}
        show={mode}
        onToggle={(val) => setMode(val)}>
        <Dropdown.Toggle
          className={[cl.div_width, cl.dropbtn, "ps-3"].join(" ")}
          id="dropdown-custom-components"
          size="lg"
          variant="light">
          Category:
          {selected ? <div className={cl.selCat}>{selected.name}</div> : ""}
        </Dropdown.Toggle>

        <Dropdown.Menu className={cl.max_content}>
          {!isPublic && mode && (
            <CategorySetBtn list={categories} getList={getCategories} />
          )}
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
    </div>
  );
};

export default CategorySelection;
