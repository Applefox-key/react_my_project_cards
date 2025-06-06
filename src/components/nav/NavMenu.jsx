import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import cl from "./mainNavbar.module.scss";

import MyNavSubmenu from "./MyNavSubmenu";

const NavMenu = ({ userRoutes, userAuth }) => {
  const navArr = useMemo(
    () => {
      const newArr = [];
      let gr = "";
      //
      userRoutes.forEach((element) => {
        if (element.nameNav)
          if (element.hasOwnProperty("group") && element.group) {
            if (gr !== element.group) {
              newArr.push({
                groupMenu: [element],
                title: element.group,
                groupPath: element.groupPath,
              });
              gr = element.group;
            } else newArr[newArr.length - 1].groupMenu.push(element);
          } else {
            newArr.push(element);
            gr = "";
          }
      });

      return newArr;
    }, // eslint-disable-next-line
    [userAuth]
  );
  return (
    <>
      {navArr.map((item, i) =>
        item.hasOwnProperty("groupMenu") ? (
          <MyNavSubmenu
            key={i}
            navArr={item.groupMenu}
            group={item.title.toUpperCase()}
            groupPath={item.groupPath}
          />
        ) : (
          <Link
            to={item.path}
            key={i}
            id={"path" + item.nameNav.trim()}
            className={
              window.location.pathname.includes(item.path) ? cl.active : ""
            }>
            {item.nameNav.toUpperCase()}
          </Link>
        )
      )}
    </>
  );
};

export default NavMenu;
