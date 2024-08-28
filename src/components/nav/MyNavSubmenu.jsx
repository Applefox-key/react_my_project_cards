import React from "react";
import { useNavigate } from "react-router-dom";

import cl from "./mainNavbar.module.scss";

import { IoMdArrowDropdown } from "react-icons/io";

const MyNavSubmenu = ({ navArr, group, groupPath }) => {
  const clName = () => {
    return navArr.some((el) => window.location.pathname.includes(el.path))
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
              window.location.pathname.includes(item.path) ? cl.active : ""
            }>
            {item.nameNav.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MyNavSubmenu;
