import React, { useEffect, useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

import cl from "./MyFilter.module.scss";
import "../../../styles/collectMenu.scss";

const MyFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const [ishide, setIsHide] = useState(true);
  useEffect(() => {
    if (filter !== value && !filter) setValue("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
  const handleClick = (e) => {
    e.stopPropagation();
    if (ishide) setIsHide(false);
    //old filter -- just close search field
    else if (value === filter) {
      setFilter("");
      setValue("");
      setIsHide(true);
    } else if (!!value) {
      setFilter(value);
    }
  };

  return (
    <div
      className={ishide ? cl.short : "position-relative"}
      onClick={() => {
        setIsHide(!ishide);
      }}>
      <div className={cl.secondarybox}>
        <div className={cl.icon} onClick={handleClick}>
          <HiOutlineMagnifyingGlass className={cl.icon} />
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

export default MyFilter;
