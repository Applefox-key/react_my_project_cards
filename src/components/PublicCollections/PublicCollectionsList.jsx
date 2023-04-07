import React, { useEffect, useState } from "react";
import BaseAPI from "../../API/BaseAPI";
import { useCollectSelection } from "../../hooks/useCollectSelection";
import { useQuery } from "../../hooks/useQuery";
import MySpinner from "../UI/MySpinner";
import PublicCollectTable from "./PublicCollectTable";
import { GO_TO } from "../../router/routes";
import CollectionCardsList from "../CollectionsListCommon/CollectionCardsList";

const PublicCollectionsList = ({ selectedCategory, filter, viewmode }) => {
  const [list, setlist] = useState([]);

  const [getPbCollWithCont, isLoading] = useQuery(async () => {
    const col = await BaseAPI.getPublicCollectionsAndContent();

    setlist(col);
  });
  const filtredList = useCollectSelection(list, selectedCategory, filter);
  useEffect(() => {
    getPbCollWithCont();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <MySpinner />
      ) : viewmode === 1 ? (
        <PublicCollectTable filtredList={filtredList} />
      ) : (
        <div className="d-flex p-2 flex-wrap justify-content-center">
          {/* <PublicColectionsGalery
            selectedCategory={selectedCategory}
            filtredList={filtredList}
          />{" "} */}
          <CollectionCardsList
            selectedCategory={selectedCategory}
            filtredList={filtredList}
            routeOne={GO_TO.pubCollect}
          />
        </div>
      )}
    </>
  );
};

export default PublicCollectionsList;
