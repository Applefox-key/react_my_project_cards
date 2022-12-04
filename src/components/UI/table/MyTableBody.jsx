import React from "react";
import RowContent from "./RowContent";

const MyTableBody = ({ btnsArray = [], onRowClick = "", ...props }) => {
  const editId = props.edit ? props.edit.content.id : null;
  return (
    <tbody className="fs-4">
      {props.dataArray.map((element, i) => (
        <tr
          // key={"row" + element.id ? element.id : i}
          key={"row" + element.id + i}
          onClick={(e) => {
            e.stopPropagation();
            if (onRowClick && editId !== element.id) onRowClick(element);
          }}>
          <RowContent
            // key={"rowC" + element.id ? element.id : i}
            edit={editId === element.id ? props.edit : null}
            content={element}
            i={i}
            btnsArray={btnsArray}
            namesArray={props.namesArray}
          />
        </tr>
      ))}
    </tbody>
  );
};

export default MyTableBody;
