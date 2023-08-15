import React, { useEffect, useState } from "react";
import BaseAPI from "../../../API/BaseAPI";
import { usePopup } from "../../../hooks/usePopup";
import { useQuery } from "../../../hooks/useQuery";
import CollectionCardsList from "../../CollectionsCommon/CollectionCardsList";
import { GO_TO } from "../../../router/routes";
import { favorite, share } from "../../../utils/contentRequests";
import SpinnerLg from "../../UI/SpinnerLg/SpinnerLg";

const UsersCollections = ({
  viewmode,
  commonSettings,
  privateSettings,
  setSettingsPrivat,
}) => {
  const [collectionList, setCollectionList] = useState([]);
  const [getCollections, isLoading, error] = useQuery(async () => {
    setCollectionList(
      await BaseAPI.getCollectionsAndContent(
        "",
        commonSettings.selectedCategorymy.id,
        commonSettings.filter,
        privateSettings.shared,
        privateSettings.favorite
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
        let res = privateSettings.shared
          ? collectionList.filter((elem) => elem.collection.id !== element.id)
          : collectionList.map((elem) => {
              if (elem.collection.id !== element.id) return elem;
              let nec = {
                ...elem.collection,
                isPublic: !elem.collection.isPublic,
              };

              return { ...elem, collection: nec };
            });
        setCollectionList(res);
      } catch (error) {
        setPopup.error("something goes wrong");
      }
    },
    favoriteColl: async (element) => {
      try {
        await favorite(element, setPopup);

        let res = privateSettings.favorite
          ? collectionList.filter((elem) => elem.collection.id !== element.id)
          : collectionList.map((elem) => {
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
      setSettingsPrivat("isNew");
    },
  };
  useEffect(() => {
    if (privateSettings.isNew) return;
    getCollections();

    if (error) setPopup.error(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    privateSettings.isNew,

    commonSettings.selectedCategorymy,
    commonSettings.filter,
    privateSettings.shared,
    privateSettings.favorite,
  ]);
  return (
    <>
      {isLoading ? (
        <SpinnerLg className="span_wrap" />
      ) : (
        <CollectionCardsList
          filtredList={collectionList}
          listFn={listFn}
          routeOne={GO_TO.myCollect}
        />
      )}
    </>
  );
};

export default UsersCollections;
