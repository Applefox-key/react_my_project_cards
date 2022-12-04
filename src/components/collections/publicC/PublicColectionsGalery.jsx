import React from "react";

import PublicCollectionCard from "./PublicCollectionCard";

const PublicColectionsGalery = ({ filtredList }) => {
  return (
    <>
      {filtredList.length === 0 ? (
        <h1>No collections</h1>
      ) : (
        filtredList.map((item) => (
          <PublicCollectionCard list={item} key={item.collection.id} />
        ))
      )}
    </>
  );
};

export default PublicColectionsGalery;
