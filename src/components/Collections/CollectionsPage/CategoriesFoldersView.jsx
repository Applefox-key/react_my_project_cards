import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../../styles/viewForms.scss";

import SpinnerLg from "../../UI/SpinnerLg/SpinnerLg";

import { useQuery } from "../../../hooks/useQuery";
import { sortByFieldCat } from "../../../utils/arraysFunc";
import BaseAPI from "../../../API/BaseAPI";
import { AiOutlineFolder } from "react-icons/ai";

const CategoriesFoldersView = ({ setSettingsCommon, filterTxt, viewmode }) => {
  const [categories, setCategories] = useState([]);
  const isPublic = window.location.pathname.includes("pub");
  const [getCategories, isLoadingCat] = useQuery(async () => {
    const cat = await BaseAPI.getCategoriesListWithCollections(isPublic);
    setCategories(sortByFieldCat(cat));
  });
  // const setPopup = usePopup();
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
    e.stopPropagation();
    let tab = isPublic ? "pub" : "my";
    tab = isPublic && col.isMy ? "my" : tab;
    route(`/collections/${tab}/${col.id}/${col.name}`);
  };

  return (
    <>
      {isLoadingCat ? (
        <SpinnerLg className="span_wrap" />
      ) : (
        <div className={!parseInt(viewmode) ? "card-view-cat" : "tbl-view-cat"}>
          {filtredList().map((el) => (
            <div key={el.id} className="list-wrap">
              <div className="listHeader" onClick={() => categoryFilter(el)}>
                <AiOutlineFolder className="mt-2" />
                <div>
                  {el.name.toUpperCase()} <span>{el.collections.length}</span>
                </div>
              </div>
              <div className="listBody">
                {el.collections.map((col) => (
                  <div
                    className="listItem"
                    key={col.id}
                    onClick={(e) => openColllection(e, col)}>
                    <span>{col.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CategoriesFoldersView;
