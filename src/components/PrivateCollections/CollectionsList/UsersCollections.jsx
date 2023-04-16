import React, { useEffect, useState } from "react";
import BaseAPI from "../../../API/BaseAPI";
import { usePopup } from "../../../hooks/usePopup";
import { useQuery } from "../../../hooks/useQuery";
import CollectionsTable from "./CollectionsTable";
import CollectionCardsList from "../../CollectionsListCommon/CollectionCardsList";
import { GO_TO } from "../../../router/routes";
import { favorite, share } from "../../../utils/contentRequests";
import SpinnerLg from "../../UI/SpinnerLg/SpinnerLg";

const UsersCollections = ({
  viewmode,
  selectedCategory,
  filter,
  setIsNew,
  isNew,
  onlySharedFav,
}) => {
  const [collectionList, setCollectionList] = useState([]);

  const [getCollections, isLoading, error] = useQuery(async () => {
    setCollectionList(
      await BaseAPI.getCollectionsAndContent(
        "",
        selectedCategory.id,
        filter,
        onlySharedFav.shared,
        onlySharedFav.favorite
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
    favoriteColl: async (element) => {
      try {
        await favorite(element, setPopup);
        let res = collectionList.map((elem) => {
          console.log(elem);

          if (elem.collection.id !== element.id) return elem;
          let nec = {
            ...elem.collection,
            isFavorite: !elem.collection.isFavorite,
          };

          return { ...elem, collection: nec };
        });

        setCollectionList(res);
      } catch (error) {
        setPopup.error("something goes wrong");
      }
    },
    addNew: async () => {
      setIsNew(true);
    },
  };
  useEffect(() => {
    if (isNew) return;
    getCollections();

    if (error) setPopup.error(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isNew,
    viewmode,
    selectedCategory,
    filter,
    onlySharedFav.shared,
    onlySharedFav.favorite,
  ]);

  return (
    <>
      {isLoading ? (
        <SpinnerLg className="span_wrap" />
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
