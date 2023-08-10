import React, { useState } from "react";
import cl from "../SideBar.module.scss";
import SideBarList from "./SideBarList";
import SideBarMenuIcons from "./SideBarMenuIcons";

const SideBar = ({ addOne, setExpressions, onSelectCategory, ...props }) => {
  const [sideBar, setSideBar] = useState({ show: false });
  const isPublic = window.location.pathname.includes("pub");
  return (
    <div className={cl["sideBar-wrap"]}>
      <div className={cl["sideBar-narrow"]}>
        <button
          data-title="select a category"
          onClick={() => setSideBar({ ...sideBar, show: !sideBar.show })}
          className={cl.shadow}>
          ☰
        </button>
        <SideBarMenuIcons
          setExpressions={setExpressions}
          addOne={addOne}
          {...props}
        />
      </div>
      {sideBar.show && (
        <div className={cl["sideBar-wide"]}>
          {/* <ThemesChoosing /> */}
          <SideBarList
            onSelect={(val) => {
              props.setSettingsCommon(
                isPublic ? "selectedCategorypub" : "selectedCategorymy",
                val
              );
              setSideBar({ ...sideBar, show: !sideBar.show });
            }}
            colCatPub={props.commonSettings.selectedCategorypub}
            colCat={props.commonSettings.selectedCategorymy}
          />
        </div>
      )}
    </div>
  );
};

export default SideBar;
