import React, { useEffect, useMemo, useRef, useState } from "react";
import { BiSolidRightArrow } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";

import cl from "./CategorySelection.module.scss";

import { useOutsideClick } from "../../hooks/useOutSideClick";
import { useQuery } from "../../hooks/useQuery";

import BaseAPI from "../../API/BaseAPI";

const FilterByCategory = ({
  onSelect,
  colCat = "",
  colCatPub = "",
  isPb = null,
  notFilter = false,
}) => {
  const [isShow, setIsShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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
  const wrapRef = useRef(null);
  useOutsideClick(wrapRef, () => setIsShow(false));
  const handleSearch = (e) => {
    e.stopPropagation();
    const searchVal = e.target.value.toLowerCase();
    setSearchTerm(searchVal);
  };
  const filtered = useMemo(
    () =>
      categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm)
      ),
    [searchTerm, categories]
  );

  return (
    <div className={cl.catSelect}>
      <div
        className={
          "catdropdown m-auto" +
          (!!selected && !notFilter ? " active-border" : "")
        }
        onClick={() => setIsShow(!isShow)}
        ref={wrapRef}>
        {!!selected && !!selected.id
          ? selected.name
          : !notFilter
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
          <div className={cl.firstSelect} onClick={() => onSelectItem(-1)}>
            {!notFilter ? "all categories" : "no category"}
          </div>
          {notFilter && (
            <div
              className={cl.firstSelect}
              value={-2}
              onClick={() => onSelectItem(-2)}>
              ADD NEW
            </div>
          )}{" "}
          <div className={cl.searchInput} onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              placeholder="🔎 Search category..."
              value={searchTerm}
              onChange={handleSearch}
            />
            {searchTerm && <IoCloseOutline onClick={() => setSearchTerm("")} />}
          </div>
          {!isLoadingCat &&
            filtered.map((el, i) => (
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
