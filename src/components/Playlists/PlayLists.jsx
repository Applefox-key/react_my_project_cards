import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CollectionsCommon/collectionList.scss";
import "../../styles/oneCollection.scss";

import {
  collectionPageSettings,
  restoreSettings,
  saveSet,
} from "../../utils/pageSettings";
import PlayListsMenu from "./PlayListsMenu";
import SideBarPlay from "../SideBar/SideBarPlayList.jsx/SideBarPlay";
import UsersPlayLists from "./UsersPlayLists";
import PlayListEditModal from "./PlayListEditModal";

const Playlists = () => {
  const isPublic = window.location.pathname.includes("pub");
  const router = useNavigate();
  const latestStateRef = useRef();
  const pageSet = restoreSettings(isPublic);
  const [viewmode, setViewmode] = useState(pageSet.viewmode);
  const [commonSettings, setCommonSettings] = useState({
    filter: pageSet.filter,
    editEl: "",
  });

  const updateRef = () => {
    latestStateRef.current = {
      ...commonSettings,
      ...viewmode,
      viewmode,
    };
  };

  const setSettingsCommon = (field, val) => {
    let newVal = collectionPageSettings(commonSettings, field, val, isPublic);
    setCommonSettings(newVal);
  };

  const viewmodeChange = () => {
    let newVal = 1 - viewmode;
    setViewmode(newVal);
    router(window.location.pathname + "#" + newVal, { replace: true });
  };

  useEffect(() => {
    setViewmode(window.location.hash === "#1" ? "1" : "0");
    return () => saveSet(latestStateRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (window.location.hash === "")
      router(window.location.pathname + "#" + viewmode, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.hash]);

  useEffect(() => {
    updateRef([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commonSettings.filter]);
  return (
    <div className="d-flex">
      <SideBarPlay
        viewmodeChange={viewmodeChange}
        commonSettings={commonSettings}
        setSettingsCommon={setSettingsCommon}
      />
      <div className="wrap_box ">
        {commonSettings.editEl && (
          <PlayListEditModal
            isEdit={commonSettings.editEl}
            setIsEdit={(val) => setSettingsCommon("editEl", val)}
            list={commonSettings.editEl}
            onHide={() => {
              setSettingsCommon("editEl", "");
            }}
          />
        )}
        <PlayListsMenu
          viewmodeChange={viewmodeChange}
          commonSettings={commonSettings}
          setSettingsCommon={setSettingsCommon}
        />

        <div className="allcollect">
          <UsersPlayLists
            viewmode={viewmode}
            commonSettings={commonSettings}
            setSettingsCommon={setSettingsCommon}
          />
        </div>
      </div>
    </div>
  );
};

export default Playlists;