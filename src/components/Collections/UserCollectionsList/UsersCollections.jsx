import React, { useEffect, useState } from "react";

import CollectionsList from "../CollectionsPage/CollectionsList";
import SpinnerLg from "../../UI/SpinnerLg/SpinnerLg";

import { useCollectSelection } from "../../../hooks/useCollectSelection";
import { usePopup } from "../../../hooks/usePopup";
import { useQuery } from "../../../hooks/useQuery";
import { favorite, share } from "../../../utils/contentRequests";
import { GO_TO } from "../../../router/routes";
import BaseAPI from "../../../API/BaseAPI";

const UsersCollections = ({
  commonSettings,
  privateSettings,
  setSettingsPrivat,
  setSettingsCommon,
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
    toCategory: (cat) => {
      setSettingsCommon("selectedCategorymy", cat);
    },
    delColl: async (element) => {
      if (!window.confirm("Delete this collection?")) return;
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
    privateSettings.shared,
    privateSettings.favorite,
  ]);

  const filtredList = useCollectSelection(
    collectionList,
    commonSettings.selectedCategorymy,
    commonSettings.filter,
    commonSettings.sorting
  );

  return (
    <>
      {isLoading || !!error ? (
        <SpinnerLg className="span_wrap" />
      ) : (
        <>
          {commonSettings.selectedCategorymy && (
            <p className="categoryLine">
              {commonSettings.selectedCategorymy.name}{" "}
            </p>
          )}
          <CollectionsList
            filtredList={filtredList}
            listFn={listFn}
            routeOne={GO_TO.myCollect}
            sort={
              commonSettings.selectedCategorymy
                ? ""
                : commonSettings.sorting.field
            }
          />
        </>
      )}
    </>
  );
};

export default UsersCollections;
