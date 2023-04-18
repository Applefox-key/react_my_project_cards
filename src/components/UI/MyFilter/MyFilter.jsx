import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import MyInputGroup from "../MyInput/MyInputGroup";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

import "../../../styles/collectMenu.scss";
const MyFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  useEffect(() => {
    if (!filter && value) setValue("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
  return (
    <div className="findWidth">
      <MyInputGroup
        classgroup={"h-100 mb-0 collect-find"}
        label=<HiOutlineMagnifyingGlass />
        value={value}
        size="lg"
        type="text"
        onKeyPress={(e) => {
          if (e.key === "Enter") setFilter(e.target.value);
        }}
        onChange={(e) => {
          setValue(e.target.value);
        }}>
        {value && (
          <>
            <Button
              className="ms-1"
              variant="light"
              onClick={(e) => {
                setFilter(value);
              }}>
              OK
            </Button>
            <Button
              variant="light"
              onClick={(e) => {
                setValue("");
                setFilter("");
              }}>
              X
            </Button>
          </>
        )}
      </MyInputGroup>
    </div>
  );
};

export default MyFilter;
