import React, { useEffect, useState } from "react";
import BaseAPI from "../../API/BaseAPI";
import { useCollectSelection } from "../../hooks/useCollectSelection";
import { useQuery } from "../../hooks/useQuery";
import PublicCollectTable from "./PublicCollectTable";
import { GO_TO } from "../../router/routes";
import CollectionCardsList from "../CollectionsCommon/CollectionCardsList";
import SpinnerLg from "../UI/SpinnerLg/SpinnerLg";

const PublicCollectionsList = ({ commonSettings, viewmode }) => {
  const [list, setlist] = useState([]);
  const [getPbCollWithCont, isLoading] = useQuery(async () => {
    const col = await BaseAPI.getPublicCollectionsAndContent();

    setlist(col);
  });
  const filtredList = useCollectSelection(
    list,
    commonSettings.selectedCategorypub,
    commonSettings.filter
  );
  useEffect(() => {
    getPbCollWithCont();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <SpinnerLg className="span_wrap" />
      ) : viewmode === 1 ? (
        <PublicCollectTable filtredList={filtredList} />
      ) : (
        <div className="d-flex p-2 flex-wrap justify-content-center">
          <CollectionCardsList
            selectedCategory={commonSettings.selectedCategorypub}
            filtredList={filtredList}
            routeOne={GO_TO.pubCollect}
          />
        </div>
      )}
    </>
  );
};

export default PublicCollectionsList;
