import React, { Fragment } from "react";
import { GoTriangleRight } from "react-icons/go";
import "../../styles/collectMenu.scss";

const CollectionPagePath = ({ list, addEndSepar = false }) => {
  return (
    <div>
      {list.map((el, i) => (
        <Fragment key={i}>
          <span
            className={(!!el.action ? "pointer " : "") + (el.cl ? el.cl : "")}
            onClick={el.action}>
            {el.name}
          </span>
          {i < list.length - 1 && <GoTriangleRight />}
        </Fragment>
      ))}
      {addEndSepar && <GoTriangleRight />}
    </div>
  );
};

export default CollectionPagePath;
