import React from "react";
import ColumnHeadWithBtns from "./ColumnHeadWithBtns";

const MyTableHeader = ({ namesArray, btnsArray = [] }) => {
  return (
    <thead className="fs-5">
      <tr>
        <th key="c">#</th>
        {namesArray.map((item) => (
          <th key={item}>{item}</th>
        ))}
        {btnsArray ? (
          <ColumnHeadWithBtns key="btnA" btnsArray={btnsArray} />
        ) : (
          <></>
        )}
      </tr>
    </thead>
  );
};

export default MyTableHeader;
