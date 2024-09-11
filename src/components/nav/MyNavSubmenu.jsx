import React from "react";
import { useNavigate } from "react-router-dom";

import cl from "./mainNavbar.module.scss";

import { IoMdArrowDropdown } from "react-icons/io";

const MyNavSubmenu = ({ navArr, group, groupPath }) => {
  const clName = () => {
    return navArr.some((el) =>
      window.location.pathname.toLowerCase().includes(el.path.toLowerCase())
    ) ||
      window.location.pathname.toLowerCase().includes(groupPath.toLowerCase())
      ? [cl.dropdown, cl.active].join(" ")
      : cl.dropdown;
  };
  const router = useNavigate();
  const handleClick = (e, p) => {
    e.stopPropagation();
    router(p);
  };
  return (
    // <span className={clName()} onClick={(e) => handleClick(e, groupPath)}>
    <div
      className={clName()}
      onClick={(e) => handleClick(e, groupPath)}
      to={groupPath}>
      {group}
      <IoMdArrowDropdown />
      <div className={cl.subbox}>
        {navArr.map((item, i) => (
          <span
            to={item.path}
            key={i}
            onClick={(e) => handleClick(e, item.path)}
            id={"path" + item.nameNav.trim()}
            className={
              window.location.pathname
                .toLowerCase()
                .includes(item.path.toLowerCase())
                ? [cl.activesubrow]
                : cl.subrow
            }>
            {item.nameNav.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MyNavSubmenu;
