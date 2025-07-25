import React, { useRef, useState } from "react";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";

import cl from "./SortMenu.module.scss";

import { useOutsideClick } from "../../../hooks/useOutSideClick";

const SortMenu = ({ fields, onSelect, defVal = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [descending, setDescending] = useState(false);
  const [selectedField, setSelectedField] = useState(defVal);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleDescending = (e) => {
    const val = !descending;
    e.stopPropagation();
    setDescending(val);
    if (selectedField) onSelect(selectedField.value, val);
  };
  const handleOptionClick = (e, field) => {
    e.stopPropagation();
    setSelectedField(field);
    onSelect(field.value, descending);
    setIsOpen(false);
  };
  const wrapRef = useRef(null);
  useOutsideClick(wrapRef, () => setIsOpen(false));

  return (
    <div>
      <button
        className={cl["dropdown-toggle"]}
        onClick={toggleMenu}
        ref={wrapRef}
        id="sortBtn">
        {descending ? (
          <FaSortAlphaUp onClick={toggleDescending} />
        ) : (
          <FaSortAlphaDown onClick={toggleDescending} />
        )}
        {selectedField ? selectedField.label : "Sort"}
      </button>
      {isOpen && (
        <ul className={cl["dropdown-menu"]}>
          {fields.map((field, i) => (
            <li
              key={field.value}
              dataf="field"
              onClick={(e) => handleOptionClick(e, field)}>
              {field.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortMenu;
