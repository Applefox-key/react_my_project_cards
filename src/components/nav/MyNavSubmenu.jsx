import React from "react";
import { Link } from "react-router-dom";

import cl from "./mainNavbar.module.scss";

import { IoMdArrowDropdown } from "react-icons/io";

const MyNavSubmenu = ({ navArr, group }) => {
  const clName = () => {
    return navArr.some((el) => window.location.pathname.includes(el.path))
      ? [cl.dropdown, cl.active].join(" ")
      : cl.dropdown;
  };
  return (
    <div className={clName()}>
      {group}
      <IoMdArrowDropdown />
      <div>
        {navArr.map((item, i) => (
          <Link
            to={item.path}
            key={i}
            id={"path" + item.nameNav.trim()}
            className={
              window.location.pathname.includes(item.path) ? cl.active : ""
            }>
            {item.nameNav.toUpperCase()}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyNavSubmenu;
