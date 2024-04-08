import React, { useEffect } from "react";
import { useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import cl from "./MyFilter.module.scss";
import "../../../styles/collectMenu.scss";

const MyFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!filter && !!value) {
      setValue("");
      setShow(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <div
      className={show ? cl.show : "position-relative"}
      onClick={() => {
        setShow(!show);
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

export default MyFilter;
