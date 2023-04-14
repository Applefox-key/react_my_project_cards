import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/collectMenu.scss";
import { VscTriangleDown, VscTriangleRight } from "react-icons/vsc";
const DropDownMenu = ({ arr, title }) => {
  const [mode, setMode] = useState(false);
  const router = useNavigate();
  return (
    <button
      className="menuBtn dropdown"
      onClick={() => setMode(!mode)}
      onBlur={() => setMode(false)}>
      {title}
      {mode ? <VscTriangleDown /> : <VscTriangleRight />}
      {mode && (
        <div className="drop-items-wrap">
          {arr.map((item, i) =>
            item.href || item.onClick ? (
              <div
                className="drop-item"
                key={i}
                onClick={item.onClick ? item.onClick : () => router(item.href)}>
                {item.symb && item.symb}
                {item.name}
              </div>
            ) : (
              <div className="divider" key={i}></div>
            )
          )}
        </div>
      )}
    </button>
  );
};

export default DropDownMenu;
