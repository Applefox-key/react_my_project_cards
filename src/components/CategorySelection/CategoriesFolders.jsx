import React, { useEffect, useState } from "react";
import "../CollectionsCommon/collectionList.scss";
import { useQuery } from "../../hooks/useQuery";
import BaseAPI from "../../API/BaseAPI";
import SpinnerLg from "./UI/SpinnerLg/SpinnerLg";
import MyTable from "./UI/table/MyTable";

const CategoriesFolders = ({ setSettingsCommon, filterTxt, viewmode }) => {
  const [categories, setCategories] = useState([]);
  const isPublic = window.location.pathname.includes("pub");
  const [getCategories, isLoadingCat] = useQuery(async () => {
    const cat = await BaseAPI.getCategoriesList(isPublic);
    setCategories(cat);
  });
  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

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
  return (
    <>
      {isLoadingCat ? (
        <SpinnerLg className="span_wrap" />
      ) : !parseInt(viewmode) ? (
        <div className="all_wrap m-auto width90">
          {filtredList().map((el) => (
            <div
              key={el.id}
              className="oneCollect-wrap"
              onClick={() => categoryFilter(el)}>
              <div className="oneCollect display-2 flex-center ">
                {el.name}
                <span>
                  {isPublic ? el.id.length : el.collection_count}
                </span>{" "}
              </div>{" "}
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

export default CategoriesFolders;
