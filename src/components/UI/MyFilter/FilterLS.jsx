import React, { useEffect } from "react";
import { useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import cl from "./MyFilter.module.scss";

import "../../../styles/collectMenu.scss";

import { useFilter } from "../../../hooks/useFilter";
const FilterLS = () => {
  const { filterG, setFilterG } = useFilter();
  const [value, setValue] = useState(filterG);
  const [hide, setHide] = useState(true);
  useEffect(() => {
    setValue(filterG);
  }, [filterG]);

  const setFilter = (val) => {
    setValue(val);
    setFilterG(val);
  };

  return (
    <div
      className={hide ? cl.show : "position-relative"}
      onClick={() => {
        if (hide) {
          setValue("");
        }
        setHide(!hide);
      }}>
      <div className={cl.mainbox}>
        <div className={cl.icon}>
          <HiOutlineMagnifyingGlass />
        </div>
        <input
          type="text"
          value={value}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            e.stopPropagation();
            setValue(e.target.value);
          }}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === "Enter") setFilter(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default FilterLS;
