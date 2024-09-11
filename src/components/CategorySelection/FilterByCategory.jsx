import React, { useEffect, useState } from "react";
import { useQuery } from "../../hooks/useQuery";
import BaseAPI from "../../API/BaseAPI";
import cl from "./CategorySelection.module.scss";
import { BiSolidRightArrow } from "react-icons/bi";

const FilterByCategory = ({
  onSelect,
  colCat = "",
  colCatPub = "",
  isPb = null,
  isForFilter = true,
}) => {
  const [isShow, setIsShow] = useState(false);
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

  const onSelectItem = (valC) => {
    if (parseInt(valC) === -2) {
      addNewCategory();
      return;
    }
    const val =
      parseInt(valC) === -1
        ? ""
        : categories.filter((el) =>
            isPublic ? el.name + "val" === valC : el.id === parseInt(valC)
          )[0];

    setSelected(val);
    onSelect(val);
    setIsShow(!isShow);
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

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.id !== "filterCat") {
        setIsShow(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className={cl.catSelect}>
      <div
        className="catdropdown m-auto"
        onClick={() => setIsShow(!isShow)}
        id="filterCat">
        {!!selected && !!selected.id
          ? selected.name
          : isForFilter
          ? "all categories"
          : "no category"}

        <BiSolidRightArrow
          onClick={(e) => {
            e.stopPropagation();
            setIsShow(!isShow);
          }}
          className={isShow ? "svgactive" : ""}
        />
      </div>
      {isShow && (
        <div className={cl.catSelectList}>
          <div
            // value={-1}
            className={cl.firstSelect}
            onClick={() => onSelectItem(-1)}>
            {isForFilter ? "all categories" : "no category"}
          </div>
          {!isForFilter && (
            <div
              className={cl.firstSelect}
              value={-2}
              onClick={() => onSelectItem(-2)}>
              ADD NEW
            </div>
          )}
          {!isLoadingCat &&
            categories.map((el, i) => (
              <div
                key={i}
                value={isPublic ? el.name + "val" : el.id}
                onClick={() =>
                  onSelectItem(isPublic ? el.name + "val" : el.id)
                }>
                {el.name}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default FilterByCategory;
