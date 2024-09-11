import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/viewForms.scss";
import "../../styles/oneCollection.scss";
import CollectionsMenu from "./CollectionsMenu";
import UsersCollections from "../CollectionsPrivate/CollectionsList/UsersCollections";
import CollectionEditModal from "../CollectionsPrivate/OneCollectionActions/CollectionEditModal";
import PublicCollectionsList from "../CollectionsPublic/PublicCollectionsList";
import { GO_TO } from "../../router/routes";
import {
  collectionPageSettings,
  restoreSettings,
  saveSet,
} from "../../utils/pageSettings";
import { useAuth } from "../../hooks/useAuth";
import CategoriesFoldersView from "./CategoriesFoldersView";
import { CSSTransition } from "react-transition-group";

const Collections = () => {
  const isPublic = window.location.pathname.includes("pub");
  const router = useNavigate();
  const latestStateRef = useRef();
  const { userAuth, updateFilterG } = useAuth(true);
  const pageSet = restoreSettings(isPublic);
  const [viewmode, setViewmode] = useState(
    userAuth && userAuth.settings ? (userAuth.settings.listView ? 1 : 0) : 0
  );
  const [commonSettings, setCommonSettings] = useState({
    selectedCategorypub: pageSet.selectedCategorypub,
    selectedCategorymy: pageSet.selectedCategorymy,
    filter: userAuth.filterG,
    byCategory: pageSet.byCategory,
    sideBar: false,
    sorting: 0,
  });

  const [privateSettings, setPrivateSettings] = useState({
    isNew: false,
    shared: pageSet.shared,
    favorite: pageSet.favorite,
  });

  const updateRef = () => {
    latestStateRef.current = {
      ...commonSettings,
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
    if (field === "filter" && val !== userAuth.filterG) updateFilterG(val);
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
    if (userAuth.filterG !== commonSettings.filter)
      setSettingsCommon("filter", userAuth.filterG);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAuth.filterG]);

  useEffect(() => {
    updateRef([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    commonSettings.byCategory,
    commonSettings.filter,
    commonSettings.selectedCategorymy,
    commonSettings.selectedCategorypub,
    commonSettings.sideBar,
    commonSettings.sorting,
    privateSettings.favorite,
    privateSettings.shared,
  ]);

  return (
    <CSSTransition
      appear={true}
      in={"true"}
      timeout={1000}
      classNames="game"
      unmountOnExit>
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
        <div className="w-100">
          {/* <div className="d-flex align-items-center position-relative"> */}
          <CollectionsMenu
            viewmodeChange={viewmodeChange}
            commonSettings={commonSettings}
            privateSettings={privateSettings}
            setSettingsCommon={setSettingsCommon}
            setSettingsPrivat={setSettingsPrivat}
          />
          <div className="allcollect">
            <div className="mainBox">
              {commonSettings.byCategory ? (
                <CategoriesFoldersView
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
                  setSettingsCommon={setSettingsCommon}
                />
              )}
            </div>
          </div>
        </div>{" "}
      </div>
    </CSSTransition>
  );
};

export default Collections;
