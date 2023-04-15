import React from "react";
import CollectionCard from "./CollectionCard";
import "./collectionList.scss";
const CollectionCardsList = ({ filtredList, routeOne, listFn }) => {
  return (
    <>
      {!filtredList ? (
        <>
          <h2>No collections</h2>{" "}
        </>
      ) : (
        <div className="all_wrap m-auto width90">
          {filtredList.map((item) => (
            <CollectionCard
              oneSet={item}
              key={item.collection.id}
              routeOne={routeOne}
              listFn={listFn}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CollectionCardsList;
