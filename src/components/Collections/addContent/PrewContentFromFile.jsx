import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import cl from "./PrewContentFromFile.module.scss";
import DropMenu from "../../UI/SortMenu/DropMenu";
import { usePopup } from "../../../hooks/usePopup";

const PrewContentFromFile = (props) => {
  const [numbers, setNumbers] = useState({
    answer: 0,
    question: 1,
    note: 2,
  });
  const setPopup = usePopup();
  const onSelectField = (val, colIndex) => {
    setNumbers((prev) => {
      const prevCol = Object.keys(prev).find((key) => prev[key] === colIndex);
      const updated = { ...prev };
      if (prevCol) {
        updated[prevCol] = null;
      }
      if (val !== "-") {
        updated[val] = colIndex;
      }
      return updated;
    });
  };
  const next = (e) => {
    const hasEmptyFields = props.dataArray.some(
      (item, i) => !item[numbers.answer] || !item[numbers.question]
    );
    if (hasEmptyFields) {
      e.preventDefault();
      setPopup.error(`Error: missing value in question or answer `);
      return;
    }
    const res = props.dataArray.map((item, i) => {
      return {
        answer: item[numbers.answer] || "",
        question: item[numbers.question] || "",
        note: item[numbers.note] || "",
        imgA: "",
        imgQ: "",
      };
    });

    props.setSelectedContent(res);
  };
  const rowC = (row) => {
    let maxJ = 0;
    const res = props.dataArray.map((row, i) => {
      const columns = row.map((col, j) => {
        if (j > maxJ) maxJ = j;
        return (
          <td key={"col" + j} className={cl.col}>
            {col}
          </td>
        );
      });
      return <tr>{columns}</tr>;
    });
    const firstRow = Array.from({ length: maxJ + 1 }, (_, i) => {
      const selectedField =
        Object.keys(numbers).find((key) => numbers[key] === i) || "-";

      return (
        <td key={"f" + i}>
          <DropMenu
            selected={selectedField}
            fields={["-", "answer", "question", "note"]}
            onSelect={(selected) => onSelectField(selected, i)}
          />
        </td>
      );
    });

    res.unshift(<tr key="firstRow">{firstRow}</tr>);
    return res;
  };
  return props.dataArray ? (
    <div className="modal-h50">
      <Button size="lg" variant="outline-secondary" onClick={next}>
        NEXT
      </Button>
      <Table
        borderless
        className={
          props.classtbl ? "border_r15 " + props.classtbl : "border_r15"
        }>
        {rowC()}
      </Table>
    </div>
  ) : (
    <></>
  );
};

export default PrewContentFromFile;
