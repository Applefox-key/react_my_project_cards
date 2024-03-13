import React, { useEffect, useState } from "react";
import { useQuery } from "../../hooks/useQuery";
import BaseAPI from "../../API/BaseAPI";
import { Form } from "react-bootstrap";
import cl from "./CategorySelection.module.scss";
import CategoryManagerBtn from "./CategoryManagerBtn";

const FilterByCategory = ({
  onSelect,
  colCat = "",
  colCatPub = "",
  isPb = null,
  firstItem = "Category....all",
}) => {
  const isPublic =
    isPb === null ? window.location.pathname.includes("pub") : isPb;
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(isPublic ? colCatPub : colCat);
  const [getCategories, isLoadingCat] = useQuery(async () => {
    const cat = await BaseAPI.getCategoriesList(isPublic);
    setCategories(cat);
  });

  const onSelectItem = (e) => {
    const val =
      parseInt(e.target.value) === -1
        ? ""
        : categories[parseInt(e.target.value)];
    setSelected(val);
    onSelect(val);
  };

  useEffect(() => {
    getCategories();
    setSelected(isPublic ? colCatPub : colCat);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPublic]);
  useEffect(() => {
    const col = isPublic ? colCatPub : colCat;

    if (col.id === selected.id) return;
    if (!col.id && !selected.id) return;
    setSelected(col);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colCat, colCatPub, isPublic]);

  return (
    <div className={cl.catSelect}>
      {!!selected.name && <span>category</span>}

      {!selected.name && <CategoryManagerBtn icon={true} />}

      <Form.Select
        // size="sm"
        onChange={onSelectItem}
        aria-label="category select"
        className="wsort m-auto">
        {" "}
        <option value={-1}>{firstItem}</option>
        {!isLoadingCat &&
          categories.map((el, i) => (
            <option
              key={i}
              selected={
                isPublic ? selected.name === el.name : selected.id === el.id
              }
              value={i}>
              {el.name}
            </option>
          ))}
      </Form.Select>
    </div>
  );
};

export default FilterByCategory;
