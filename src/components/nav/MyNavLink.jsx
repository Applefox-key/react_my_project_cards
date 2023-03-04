import React from "react";
import { NavLink } from "react-router-dom";

const MyNavLink = ({ root, i }) => {
  return (
    <NavLink
      to={root.path}
      // className={({ isActive }) =>
      //   isActive
      //     ? "nav-link px-2 text-white bg-dark"
      //     : "nav-link px-2 text-dark"
      // }
      className={({ isActive }) =>
        isActive ? "nav-link px-4 text-white" : "nav-link px-4 text-dark"
      }
      style={{ borderRadius: "5px", fontWeight: "500" }}
      // className={({ isActive }) =>
      //   isActive ? cl.navl_activ : cl.navl_unactiv
      // }
    >
      {root.nameNav}
    </NavLink>
  );
};

export default MyNavLink;
