import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./collectionList.scss";
import "../../styles/oneCollection.scss";
import CollectionsMenu from "./CollectionsMenu";
import UsersCollections from "../PrivateCollections/CollectionsList/UsersCollections";
import CollectionEditModal from "../PrivateCollections/OneCollectionActions/CollectionEditModal";
import PublicCollectionsList from "../PublicCollections/PublicCollectionsList";
import CategoriesFolders from "../CategorySelection/CategoriesFolders";
import { GO_TO } from "../../router/routes";

import {
  collectionPageSettings,
  restoreSettings,
  saveSet,
} from "../../utils/pageSettings";
import SideBar from "../SideBar/SideBarCollections/SideBar";

const Collections = () => {
  const isPublic = window.location.pathname.includes("pub");
  const router = useNavigate();
  const latestStateRef = useRef();
  const pageSet = restoreSettings(isPublic);
  const [viewmode, setViewmode] = useState(pageSet.viewmode);
  const [commonSettings, setCommonSettings] = useState({
    selectedCategorypub: pageSet.selectedCategorypub,
    selectedCategorymy: pageSet.selectedCategorymy,
    filter: pageSet.filter,
    byCategory: pageSet.byCategory,
  });

  const [privateSettings, setPrivateSettings] = useState({
    isNew: false,
    shared: pageSet.shared,
    favorite: pageSet.favorite,
  });

  const updateRef = () => {
    latestStateRef.current = {
      ...commonSettings,
      ...viewmode,
      ...privateSettings,
      viewmode,
    };
  };
  const setSettingsPrivat = (field) => {
    setPrivateSettings({
      ...privateSettings,
      [field]: !privateSettings[field],
    });
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
  }, [
    commonSettings.byCategory,
    commonSettings.filter,
    commonSettings.selectedCategorymy,
    commonSettings.selectedCategorypub,
    privateSettings.favorite,
    privateSettings.shared,
  ]);
  return (
    <div className="wrap_box">
      {privateSettings.isNew && (
        <CollectionEditModal
          isEdit={privateSettings.isNew}
          setIsEdit={(val) =>
            setPrivateSettings({ ...privateSettings, isNew: val })
          }
          isNew={privateSettings.isNew}
          onHide={() => {
            setPrivateSettings({
              ...privateSettings,
              isNew: false,
            });
            router(`${GO_TO.myCollect}#${viewmode}`);
          }}
        />
      )}
      <CollectionsMenu
        viewmodeChange={viewmodeChange}
        commonSettings={commonSettings}
        privateSettings={privateSettings}
        setSettingsCommon={setSettingsCommon}
      />{" "}
      <div className="d-flex">
        {" "}
        <SideBar
          viewmodeChange={viewmodeChange}
          commonSettings={commonSettings}
          setSettingsCommon={setSettingsCommon}
          privateSettings={privateSettings}
          setSettingsPrivat={setSettingsPrivat}
        />
        {/* {fragment_SearchingTips({ ...commonSettings, setSettingsCommon })} */}
        <div className="allcollect">
          {commonSettings.byCategory ? (
            <CategoriesFolders
              setSettingsCommon={setSettingsCommon}
              filterTxt={commonSettings.filter}
              viewmode={viewmode}
            />
          ) : !isPublic ? (
            <UsersCollections
              viewmode={viewmode}
              commonSettings={commonSettings}
              setSettingsCommon={setSettingsCommon}
              privateSettings={privateSettings}
              setSettingsPrivat={setSettingsPrivat}
            />
          ) : (
            <PublicCollectionsList
              commonSettings={commonSettings}
              viewmode={viewmode}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Collections;
