import React, { useEffect, useRef, useState } from "react";
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
import { useLastMode } from "../../hooks/useLastMode";

const PlaylistsPage = () => {
  const isPublic = window.location.pathname.includes("pub");
  const latestStateRef = useRef();
  const pageSet = restoreSettings(isPublic);
  const { userAuth } = useAuth(true);
  const [viewmode, viewmodeChange] = useLastMode(userAuth);
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
  useEffect(() => {
    return () => saveSet(latestStateRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
