import React, { useEffect, useState } from "react";

import CollectionsList from "../CollectionsPage/CollectionsList";
import SpinnerLg from "../../UI/SpinnerLg/SpinnerLg";

import { useCollectSelection } from "../../../hooks/useCollectSelection";
import { useQuery } from "../../../hooks/useQuery";
import { GO_TO } from "../../../router/routes";
import BaseAPI from "../../../API/BaseAPI";

const PublicCollectionsList = ({ commonSettings, setSettingsCommon }) => {
  const [list, setlist] = useState([]);
  const [getPbCollWithCont, isLoading] = useQuery(async () => {
    const col = await BaseAPI.getPublicCollectionsAndContent();
    setlist(col);
  });
  const listFn = {
    toCategory: (cat) => {
      setSettingsCommon("selectedCategorypub", cat);
    },
  };
  useEffect(() => {
    getPbCollWithCont();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const filtredList = useCollectSelection(
    list,
    commonSettings.selectedCategorypub,
    commonSettings.filter,
    commonSettings.sorting
  );

  return (
    <>
      {isLoading ? (
        <SpinnerLg className="span_wrap" />
      ) : (
        <div className="d-flex flex-wrap justify-content-center">
          <CollectionsList
            listFn={listFn}
            filtredList={filtredList}
            routeOne={GO_TO.pubCollect}
            sort={commonSettings.sorting.field}
          />
        </div>
      )}
    </>
  );
};

export default PublicCollectionsList;
