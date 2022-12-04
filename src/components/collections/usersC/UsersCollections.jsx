import React, { useEffect, useState } from "react";
import BaseAPI from "../../../API/BaseAPI";
import { usePopup } from "../../../hooks/usePopup";
import { useQuery } from "../../../hooks/useQuery";
import MySpinner from "../../UI/MySpinner";
import CollectionCardsList from "../CollectionCardsList";
import CollectionsTable from "./CollectionsTable";

const UsersCollections = ({ viewmode, selectedCategory, filter, isNew }) => {
  const [collectionList, setCollectionList] = useState([]);
  const [getCollections, isLoading, error] = useQuery(async () => {
    setCollectionList(
      await BaseAPI.getCollectionsAndContent("", selectedCategory.id, filter)
    );
  });
  const setPopup = usePopup();
  useEffect(() => {
    if (isNew) return;
    getCollections();
    console.log(error);

    if (error) setPopup.error(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNew, viewmode, selectedCategory, filter]);
  // const filtredList = useCollectSelection(
  //   collectionList,
  //   selectedCategory,
  //   filter
  // );

  return (
    <>
      {/* <div className="d-flex pb-2 justify-content-center mt-4"></div> */}
      {isLoading ? (
        <MySpinner />
      ) : viewmode === "1" ? (
        <CollectionCardsList
          filtredList={collectionList}
          getCollections={getCollections}
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
