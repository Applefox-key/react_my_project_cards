import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/viewForms.scss";
import "../../styles/oneCollection.scss";
import {
  collectionPageSettings,
  restoreSettings,
  saveSet,
} from "../../utils/pageSettings";
import PlaylistsMenu from "./PlaylistsMenu";
import { useAuth } from "../../hooks/useAuth";
import Playlists from "./Playlists";
import PlayListEditModal from "./Edit/PlayListEditModal";

const PlaylistsPage = () => {
  const isPublic = window.location.pathname.includes("pub");
  const router = useNavigate();
  const latestStateRef = useRef();
  const pageSet = restoreSettings(isPublic);
  const { userAuth } = useAuth(true);
  const [viewmode, setViewmode] = useState(
    userAuth && userAuth.settings ? (userAuth.settings.listView ? 1 : 0) : 0
  );
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
    if (window.location.hash === "")
      setViewmode(
        userAuth && userAuth.settings ? (userAuth.settings.listView ? 1 : 0) : 0
      );
    else setViewmode(window.location.hash === "#1" ? "1" : "0");
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
    <div className="wrap_box">
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
      <PlaylistsMenu
        viewmodeChange={viewmodeChange}
        commonSettings={commonSettings}
        setSettingsCommon={setSettingsCommon}
      />
      <div className="allcollect">
        <Playlists
          viewmode={viewmode}
          commonSettings={commonSettings}
          setSettingsCommon={setSettingsCommon}
        />
      </div>
    </div>
  );
};

export default PlaylistsPage;