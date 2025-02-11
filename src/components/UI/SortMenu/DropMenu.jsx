import React, { useEffect, useRef, useState } from "react";
import cl from "./SortMenu.module.scss";

import { useOutsideClick } from "../../../hooks/useOutSideClick";

const DropMenu = ({ fields, onSelect, selected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedField, setSelectedField] = useState(selected);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    setSelectedField(selected);
  }, [selected]);

  const handleOptionClick = (e, field) => {
    e.stopPropagation();
    setSelectedField(field);
    onSelect(field);
    setIsOpen(false);
  };
  const wrapRef = useRef(null);
  useOutsideClick(wrapRef, () => setIsOpen(false));

  return (
    <div>
      <button
        className={cl["dropdown-toggle-menu"]}
        onClick={toggleMenu}
        ref={wrapRef}>
        {selectedField ? selectedField : fields[0]}
      </button>
      {isOpen && (
        <ul className={cl["dropdown-menu"]}>
          {fields.map((field, i) => (
            <li key={i} onClick={(e) => handleOptionClick(e, field)}>
              {field}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropMenu;
