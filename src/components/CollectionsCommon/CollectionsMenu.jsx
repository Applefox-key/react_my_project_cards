import React, { useMemo } from "react";
import "../../styles/collectMenu.scss";
import { fragment_SearchingTips } from "../../utils/pagesFragments";
import ByCategoryBtn from "../UI/tgb/ByCategoryBtn";
import BackMenuBtn from "../UI/tgb/BackMenuBtn";
import FilterByCategory from "../CategorySelection/FilterByCategory";
import ToggleView from "../UI/TogleView/ToggleView";
import SortMenu from "../UI/SortMenu/SortMenu";
import { useNavigate } from "react-router-dom";
import CollectionPagePath from "../UI/CollectionPagePath";
import UsersCollectionsBtn from "../CollectionsPrivate/CollectionsList/UserCollectionsBtns";

const CollectionsMenu = ({ common, privat, viewmodeChange }) => {
  const { commonSettings, setSettingsCommon } = common;
  const { privateSettings, setSettingsPrivat } = privat;
  const isPublic = window.location.pathname.includes("pub");

  const sortContent = (field, isDec) => {
    setSettingsCommon("sorting", { field, isDec });
  };
  const router = useNavigate();

  const arrPath = useMemo(() => {
    const ToCollections = () => {
      if (commonSettings.byCategory) {
        setSettingsCommon("byCategory");
        return;
      }
      if (!isPublic && !!commonSettings.selectedCategorymy) {
        setSettingsCommon("selectedCategorymy", "");
        return;
      }
      if (isPublic && !!commonSettings.selectedCategorypub) {
        setSettingsCommon("selectedCategorypub", "");
        return;
      }
    };

    const res = [];
    if (isPublic) res.push({ name: "Public library", action: null });
    else res.push({ name: "My library", action: () => router("/myLibrary") });
    res.push({ name: "Collections", action: ToCollections });
    if (commonSettings.byCategory)
      res.push({ name: "Categories", action: ToCollections });
    if (!isPublic && !!commonSettings.selectedCategorymy)
      res.push({
        name: commonSettings.selectedCategorymy.name,
        action: null,
      });
    if (isPublic && !!commonSettings.selectedCategorypub)
      res.push({
        name: commonSettings.selectedCategorypub.name,
        action: null,
      });
    return res;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isPublic,
    commonSettings.byCategory,
    commonSettings.selectedCategorymy,
    commonSettings.selectedCategorypub,
    router,
  ]);

  return (
    <>
      <div className="string_menu">
        <div className="menufind">
          <div className="d-flex align-items-center">
            <CollectionPagePath list={arrPath} />
          </div>
          <div className="view-settings">
            <ToggleView
              checked={window.location.hash === "#1" ? 1 : 0}
              onChange={viewmodeChange}
            />
            <SortMenu
              fields={[
                { value: "name", label: "Name" },
                { value: "category", label: "Category" },
              ]}
              onSelect={sortContent}
            />
            <div className="buttonBox">
              <ByCategoryBtn
                className="viewBtn"
                commonSettings={commonSettings}
                setSettingsCommon={setSettingsCommon}
              />
            </div>
            <div
              className={
                (isPublic && !!commonSettings.selectedCategorypub) ||
                (!isPublic && !!commonSettings.selectedCategorymy)
                  ? "active-border"
                  : ""
              }>
              <FilterByCategory
                onSelect={(val) =>
                  setSettingsCommon(
                    isPublic ? "selectedCategorypub" : "selectedCategorymy",
                    val
                  )
                }
                colCatPub={commonSettings.selectedCategorypub}
                colCat={commonSettings.selectedCategorymy}
              />
            </div>
          </div>

          <div className="d-flex lign-items-center">
            {!isPublic && (
              <UsersCollectionsBtn
                commonSettings={commonSettings}
                privateSettings={privateSettings}
                setSettingsPrivat={setSettingsPrivat}
              />
            )}

            <BackMenuBtn />
          </div>
        </div>
      </div>{" "}
      {fragment_SearchingTips(
        commonSettings,
        privateSettings,
        setSettingsCommon,
        setSettingsPrivat
      )}
    </>
  );
};

export default CollectionsMenu;
