import React from "react";
import { NavLink } from "react-router-dom";

const MyNavLink = ({ root, i }) => {
  return (
    <NavLink
      to={root.path}
      className={({ isActive }) =>
        isActive
          ? "nav-link px-2 text-white bg-dark"
          : "nav-link px-2 text-dark"
      }
    >
      {root.nameNav}
    </NavLink>
  );
};

export default MyNavLink;
