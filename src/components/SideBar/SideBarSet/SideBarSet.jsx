import React, { useState } from "react";
import cl from "../SideBar.module.scss";
import SideBarIconsSet from "./SideBarIconsSet";
import SideBarGameMenu from "./SideBarGameMenu";
import SideBarIconsSetPub from "./SideBarIconsSetPub";

const SideBarSet = (props) => {
  const [sideBar, setSideBar] = useState({ show: false });
  const isPublic = window.location.pathname.includes("pub");
  return (
    <div className={cl["sideBar-wrap"]}>
      <div className={cl["sideBar-narrow"]}>
        {" "}
        {!sideBar.show && <div className="ball" />}
        <button
          onClick={() => setSideBar({ ...sideBar, show: !sideBar.show })}
          data-title="PLAY GAMES"
          className={cl.shadow}>
          {" "}
          ☰
        </button>
        {isPublic ? (
          <>
            <SideBarIconsSetPub
              addToMyCollection={props.addToMyCollection}
              collection={props.collection}
            />
          </>
        ) : (
          <SideBarIconsSet
            setContent={props.setContent}
            colObj={props.colObj}
            mode={props.mode}
            setMode={props.setMode}
          />
        )}
      </div>
      {sideBar.show && (
        <div className={cl["sideBar-wide"]}>
          <SideBarGameMenu />
        </div>
      )}
    </div>
  );
};

export default SideBarSet;
