import React from "react";
import Table from "react-bootstrap/Table";
import MyTableBody from "./MyTableBody";
import MyTableHeader from "./MyTableHeader";

const MyTable = (props) => {
  return props.dataArray ? (
    <Table
      striped
      borderless
      hover
      className={
        props.classtbl ? "border_r15 " + props.classtbl : "border_r15"
      }>
      <MyTableHeader {...props} />
      <MyTableBody {...props} />
    </Table>
  ) : (
    <></>
  );
};

export default MyTable;
