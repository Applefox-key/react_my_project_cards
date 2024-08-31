import React, { Fragment } from "react";
import { GoTriangleRight } from "react-icons/go";

const CollectionPagePath = ({ list }) => {
  return (
    <div>
      {list.map((el, i) => (
        <Fragment key={i}>
          <span
            className={(el.action ? "pointer " : "") + el.cl ? el.cl : ""}
            onClick={el.action}>
            {el.name}
          </span>
          {i < list.length - 1 && <GoTriangleRight />}
        </Fragment>
      ))}
    </div>
  );
};

export default CollectionPagePath;
