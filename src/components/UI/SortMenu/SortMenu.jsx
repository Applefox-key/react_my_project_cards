import React, { useEffect, useState } from "react";
import cl from "./SortMenu.module.scss";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";

const SortMenu = ({ fields, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [descending, setDescending] = useState(false);
  const [selectedField, setSelectedField] = useState(null);

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
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.id !== "sortBtn") {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  return (
    // <div className={cl.dropdown}>
    <div className={cl.dropdown}>
      <button
        className={cl["dropdown-toggle"]}
        onClick={toggleMenu}
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
            <>
              <li
                key={field.value}
                dataF="field"
                onClick={(e) => handleOptionClick(e, field)}>
                {field.label}
              </li>
            </>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortMenu;
