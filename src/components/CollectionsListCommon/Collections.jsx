import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./collectionList.scss";
import "../../styles/oneCollection.scss";
import UsersCollections from "../PrivateCollections/CollectionsList/UsersCollections";
import CollectionsMenu from "./CollectionsMenu";
import CollectionEditModal from "../PrivateCollections/OneCollectionActions/CollectionEditModal";

import { GO_TO } from "../../router/routes";

import PublicCollectionsList from "../PublicCollections/PublicCollectionsList";

const Collections = () => {
  const router = useNavigate();
  const [selectedCategory, setselectedCategory] = useState("");
  const [filter, setFilter] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [onlySharedFav, setOnlySharedFav] = useState({
    shared: false,
    favorite: false,
  });
  const [viewmode, setViewmode] = useState(
    window.location.hash === "#1" ? "1" : "0"
  );
  const viewmodeChange = () => {
    let newVal = 1 - viewmode;
    setViewmode(newVal);
    router(window.location.pathname + "#" + newVal);
  };

  useEffect(() => {
    setViewmode(window.location.hash === "#1" ? "1" : "0");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (window.location.hash === "")
      router(window.location.pathname + "#" + viewmode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

  return (
    <div className="wrap_box">
      {isNew && (
        <CollectionEditModal
          isEdit={isNew}
          setIsEdit={setIsNew}
          isNew={isNew}
          onHide={() => {
            setIsNew(false);
            router(`${GO_TO.myCollect}#${viewmode}`);
          }}
        />
      )}
      <CollectionsMenu
        viewmodeChange={viewmodeChange}
        isPublic={window.location.pathname.includes("pub")}
        isNew={isNew}
        setIsNew={setIsNew}
        filter={filter}
        setFilter={setFilter}
        selectedCategory={selectedCategory}
        setselectedCategory={setselectedCategory}
        onlySharedFav={onlySharedFav}
        setOnlySharedFav={setOnlySharedFav}
      />
      {(selectedCategory || filter) && (
        <div className="fs-4 mt-2 fst-italic">
          Search results for {selectedCategory && " category..."}
          <span className="text-primary">{selectedCategory.name}</span>
          {filter && " text..."}
          <span className="text-primary">{filter.toString()}</span>
        </div>
      )}
      <div className="allcollect">
        {!window.location.pathname.includes("pub") ? (
          <UsersCollections
            selectedCategory={selectedCategory}
            filter={filter}
            viewmode={viewmode}
            isNew={isNew}
            setIsNew={setIsNew}
            onlySharedFav={onlySharedFav}
          />
        ) : (
          <PublicCollectionsList
            selectedCategory={selectedCategory}
            filter={filter}
            viewmode={viewmode}
          />
        )}
      </div>
    </div>
  );
};

export default Collections;
