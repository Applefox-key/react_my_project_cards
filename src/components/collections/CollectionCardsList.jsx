import React from "react";
import CollectionCard from "./CollectionCard";

const CollectionCardsList = ({ filtredList }) => {
  return (
    <>
      {!filtredList ? (
        <h2>No collections</h2>
      ) : (
        <div
          className="d-flex  flex-wrap justify-content-center"
          style={{ width: "90%", margin: "auto" }}>
          {filtredList.map((item) => (
            <CollectionCard collection={item} key={item.collection.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default CollectionCardsList;
