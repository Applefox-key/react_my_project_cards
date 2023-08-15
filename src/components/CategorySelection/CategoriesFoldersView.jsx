import React, { useEffect, useState } from "react";
import "../CollectionsCommon/collectionList.scss";
import { useQuery } from "../../hooks/useQuery";
import BaseAPI from "../../API/BaseAPI";
import SpinnerLg from "../UI/SpinnerLg/SpinnerLg";
import MyTable from "../UI/table/MyTable";
import cl from "./CategorySelection.module.scss";
import { useNavigate } from "react-router-dom";
import { usePopup } from "../../hooks/usePopup";
import { favorite, share } from "../../utils/contentRequests";
import CollectionRowBtns from "./CollectionRowBtns";
import { FiFolder } from "react-icons/fi";

const CategoriesFoldersView = ({ setSettingsCommon, filterTxt, viewmode }) => {
  const [categories, setCategories] = useState([]);
  const isPublic = window.location.pathname.includes("pub");
  const [getCategories, isLoadingCat] = useQuery(async () => {
    const cat = await BaseAPI.getCategoriesListWithCollections(isPublic);
    setCategories(cat);
  });
  const setPopup = usePopup();
  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

  const route = useNavigate();
  const categoryFilter = (el) => {
    setSettingsCommon(
      isPublic ? "selectedCategorypub" : "selectedCategorymy",
      el
    );
  };
  const filtredList = () => {
    if (filterTxt)
      return categories.filter((el) =>
        el.name.toLowerCase().startsWith(filterTxt)
      );
    return categories;
  };

  const openColllection = (e, col) => {
    e.preventDefault();
    let tab = isPublic ? "pub" : "my";
    tab = isPublic && col.isMy ? "my" : tab;
    route(`/collections/${tab}/${col.id}/${col.name}`);
  };
  const listFn = {
    delColl: async (element, catid) => {
      if (!window.confirm("Delete the collection?")) return;
      try {
        await BaseAPI.deleteColection(element.id);
        let newval = categories.map((cat) =>
          cat.id !== catid
            ? cat
            : cat.collections.filter((col) => col.id !== element.id)
        );
        setCategories(newval);
      } catch (error) {
        setPopup.error("something goes wrong");
      }
    },
    shareColl: async (element, catid) => {
      try {
        await share(element, setPopup);
        let newval = categories.map((cat) => {
          if (cat.id !== catid) return cat;
          let nec = cat.collections.map((col) =>
            col.id !== element.id
              ? col
              : { ...col, isPublic: !element.isPublic }
          );
          return { ...cat, collections: nec };
        });
        setCategories(newval);
      } catch (error) {
        setPopup.error("something goes wrong");
      }
    },
    favoriteColl: async (element, catid) => {
      try {
        await favorite(element, setPopup);
        let newval = categories.map((cat) => {
          if (cat.id !== catid) return cat;

          let nec = cat.collections.map((col) =>
            col.id !== element.id
              ? col
              : { ...col, isFavorite: !element.isFavorite }
          );

          return { ...cat, collections: nec };
        });
        setCategories(newval);
      } catch (error) {
        setPopup.error("something goes wrong");
      }
    },
    // addNew: async () => {
    //   setSettingsPrivat("isNew");
    // },
  };
  return (
    <>
      {isLoadingCat ? (
        <SpinnerLg className="span_wrap" />
      ) : !parseInt(viewmode) ? (
        <div className={cl.wrapCard}>
          {filtredList().map((el) => (
            <div key={el.id} className={cl["list-wrap"]}>
              <div className={cl.listHeader} onClick={() => categoryFilter(el)}>
                <FiFolder className="mt-2" />
                {el.name.toUpperCase()}
              </div>
              <div className={cl.listBody}>
                {el.collections.map((col) => (
                  <div
                    className={cl.listItem}
                    key={col.id}
                    onClick={(e) => openColllection(e, col)}>
                    <span>{col.name}</span>

                    <CollectionRowBtns
                      catid={el.id}
                      col={col}
                      listFn={listFn}
                    />
                    {/* <div className={cl["item-btns"]}></div> */}
                  </div>
                ))}
              </div>
              <div className={cl.tbl}>
                <div className={cl.listFooter}>
                  <span>{el.collections.length}</span>{" "}
                  <div className={cl["list-btns"]}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="tblCollections">
          <MyTable
            classtbl="lavanderBack"
            onRowClick={categoryFilter}
            dataArray={filtredList()}
            namesArray={["name", isPublic ? "" : "collection_count"]}
          />{" "}
        </div>
      )}
    </>
  );
};

export default CategoriesFoldersView;
