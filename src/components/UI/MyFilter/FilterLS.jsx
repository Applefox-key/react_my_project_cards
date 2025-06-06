import React, { useEffect, useState } from "react";
import { FcSearch } from "react-icons/fc";

import cl from "./MyFilter.module.scss";
import "../../../styles/collectMenu.scss";

import { useFilter } from "../../../hooks/useFilter";

const FilterLS = () => {
  const { filterG, setFilterG } = useFilter();
  // const [value, setValue] = useState(filterG);
  const [value, setValue] = useState(filterG || "");
  // const [ishide, setIsHide] = useState(defaultHide);
  useEffect(() => {
    setValue(filterG);
  }, [filterG]);

  const setFilter = (val) => {
    setValue(val);
    setFilterG(val);
  };
  const showHide = (e) => {
    e.stopPropagation();
    // if (ishide) {
    //   setValue("");
    // }

    if (window.screen.availWidth <= 600) {
      const textInp = prompt("what do you want to find?", "");
      if (textInp) setFilterG(textInp);
      return;
    }

    // setIsHide(!ishide);
  };

  return (
    <div className={cl.short}>
      <div className={cl.mainbox}>
        <div className={cl.icon} onClick={showHide}>
          <FcSearch />
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
