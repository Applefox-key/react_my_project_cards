import React, { useEffect, useState } from "react";
import BaseAPI from "../../../API/BaseAPI";
import { usePopup } from "../../../hooks/usePopup";
import { useQuery } from "../../../hooks/useQuery";
import MySpinner from "../../UI/MySpinner";

import CollectionsTable from "./CollectionsTable";
import CollectionCardsList from "../../CollectionsListCommon/CollectionCardsList";
import { GO_TO } from "../../../router/routes";
import { share } from "../../../utils/contentRequests";

const UsersCollections = ({
  viewmode,
  selectedCategory,
  filter,
  isNew,
  onlyShared,
}) => {
  const [collectionList, setCollectionList] = useState([]);

  const [getCollections, isLoading, error] = useQuery(async () => {
    setCollectionList(
      await BaseAPI.getCollectionsAndContent(
        "",
        selectedCategory.id,
        filter,
        onlyShared
      )
    );
  });
  const setPopup = usePopup();
  const listFn = {
    delColl: async (element) => {
      if (!window.confirm("Delete the collection?")) return;
      try {
        await BaseAPI.deleteColection(element.id);
        setCollectionList(
          collectionList.filter((elem) => elem.collection.id !== element.id)
        );
      } catch (error) {
        setPopup.error("something goes wrong");
      }
    },
    shareColl: async (element) => {
      try {
        await share(element, setPopup);

        setCollectionList(
          collectionList.map((elem) => {
            if (elem.collection.id !== element.id) return elem;
            let nec = {
              ...elem.collection,
              isPublic: !elem.collection.isPublic,
            };

            return { ...elem, collection: nec };
          })
        );
      } catch (error) {
        setPopup.error("something goes wrong");
      }
    },
  };
  useEffect(() => {
    if (isNew) return;
    getCollections();

    if (error) setPopup.error(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNew, viewmode, selectedCategory, filter, onlyShared]);

  return (
    <>
      {isLoading ? (
        <MySpinner />
      ) : window.location.hash !== "#1" ? (
        <CollectionCardsList
          filtredList={collectionList}
          listFn={listFn}
          routeOne={GO_TO.myCollect}
        />
      ) : (
        <CollectionsTable
          getCollections={getCollections}
          selectedCategory={selectedCategory}
          filtredList={collectionList}
          collectionList={collectionList}
          setCollectionList={setCollectionList}
        />
      )}
    </>
  );
};

export default UsersCollections;
