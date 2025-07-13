import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import "../../../styles/collectMenu.scss";

import UsersCollectionsBtn from "../UserCollectionsList/UserCollectionsBtns";
import FilterByCategory from "../../CategorySelection/FilterByCategory";
import CollectionPagePath from "../../UI/CollectionPagePath";
import ToggleView from "../../UI/TogleView/ToggleView";
import ByCategoryBtn from "../../UI/tgb/ByCategoryBtn";
import BackMenuBtn from "../../UI/tgb/BackMenuBtn";
import SortMenu from "../../UI/SortMenu/SortMenu";

import { fragment_SearchingTips } from "../../../utils/pagesFragments";
import { useIsMobileMenu } from "../../../hooks/useIsMobileMenu";
import { TbMenuOrder } from "react-icons/tb";

const CollectionsMenu = ({ common, privat, viewmodeChange }) => {
  const { commonSettings, setSettingsCommon } = common;
  const { privateSettings, setSettingsPrivat } = privat;
  const isPublic = window.location.pathname.includes("pub");
  const [isMobile, menuOpen, toggleMenu] = useIsMobileMenu();
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
    <div className="sticky-top">
      {menuOpen && (
        <div className="string_menu string-bread">
          <div className="collect-path-box">
            <CollectionPagePath list={arrPath} />
          </div>

          <div>
            {fragment_SearchingTips(
              commonSettings,
              privateSettings,
              setSettingsCommon,
              setSettingsPrivat
            )}
          </div>
        </div>
      )}
      <div className="string_menu">
        {menuOpen && (
          <div className="collect-btn-box">
            {!isPublic && (
              <UsersCollectionsBtn
                commonSettings={commonSettings}
                privateSettings={privateSettings}
                setSettingsPrivat={setSettingsPrivat}
              />
            )}

            <BackMenuBtn />
          </div>
        )}
        <div className="view-settings">
          {isMobile && (
            <button className="mobile-menu" onClick={toggleMenu}>
              <TbMenuOrder />
            </button>
          )}
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
      </div>{" "}
    </div>
  );
};

export default CollectionsMenu;
