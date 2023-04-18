import React from "react";
import { NavLink } from "react-router-dom";

const MyNavLink = ({ root, i }) => {
  return (
    <NavLink
      to={root.path}
      className={({ isActive }) =>
        isActive ? "nav-link px-4 text-white" : "nav-link px-4 text-dark"
      }
      style={{ borderRadius: "5px", fontWeight: "500" }}>
      {root.nameNav}
    </NavLink>
  );
};

export default MyNavLink;
