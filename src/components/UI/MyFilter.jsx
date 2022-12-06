import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import MyInputGroup from "./MyInput/MyInputGroup";

const MyFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);

  return (
    <div className="w-50">
      <MyInputGroup
        classgroup="h-100 mb-0"
        label="🔎"
        value={value}
        size="lg"
        type="text"
        onKeyPress={(e) => {
          if (e.key === "Enter") setFilter(e.target.value);
        }}
        onChange={(e) => {
          setValue(e.target.value);
        }}>
        <Button
          onClick={(e) => {
            setFilter(value);
          }}>
          OK
        </Button>
        <Button
          onClick={(e) => {
            setValue("");
            setFilter("");
          }}>
          X
        </Button>
      </MyInputGroup>
    </div>
  );
};

export default MyFilter;
