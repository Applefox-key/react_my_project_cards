import React, { useEffect, useState } from "react";
import { useQuery } from "../../hooks/useQuery";
import BaseAPI from "../../API/BaseAPI";
import { Form } from "react-bootstrap";
import cl from "./CategorySelection.module.scss";

const FilterByCategory = ({
  onSelect,
  colCat = "",
  colCatPub = "",
  isPb = null,
  isForFilter = true,
}) => {
  const isPublic =
    isPb === null ? window.location.pathname.includes("pub") : isPb;
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(isPublic ? colCatPub : colCat);
  const [getCategories, isLoadingCat] = useQuery(async () => {
    const cat = await BaseAPI.getCategoriesList(isPublic);
    setCategories(cat);
  });

  const addNewCategory = async () => {
    let userInput = prompt("please write new category", "");

    if (userInput) {
      const res = await BaseAPI.createCategory(userInput);
      if (!res.error) {
        const val = { id: res.id, name: userInput };
        setCategories([...categories, val]);
        setSelected(val);
        onSelect(val);
      }
    }
  };

  const onSelectItem = async (e) => {
    if (parseInt(e.target.value) === -2) {
      addNewCategory();
      return;
    }
    const val =
      parseInt(e.target.value) === -1
        ? ""
        : categories.filter((el) =>
            isPublic
              ? el.name + "val" === e.target.value
              : el.id === parseInt(e.target.value)
          )[0];

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

    if (col.name === selected.name) return;
    if (!col.name && !selected.name) return;
    setSelected(col);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colCat, colCatPub, isPublic]);

  return (
    <div className={cl.catSelect}>
      <Form.Select
        onChange={onSelectItem}
        value={!selected ? -1 : isPublic ? selected.name + "val" : selected.id}
        aria-label="category select"
        className="catdropdown m-auto">
        <option value={-1} className={cl.firstSelect}>
          {isForFilter ? "all categories" : "no category"}
        </option>
        {!isForFilter && (
          <option className={cl.firstSelect} value={-2}>
            ADD NEW
          </option>
        )}
        {!isLoadingCat &&
          categories.map((el, i) => (
            <option key={i} value={isPublic ? el.name + "val" : el.id}>
              {el.name}
            </option>
          ))}
      </Form.Select>
    </div>
  );
};

export default FilterByCategory;
