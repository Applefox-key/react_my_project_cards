import React from "react";
import CollectionCard from "./CollectionCard";
import "./collectionList.scss";

const CollectionCardsList = ({ filtredList, routeOne, listFn }) => {
  return (
    <>
      <div
        className={
          window.location.hash === "#1" ? "tbl_wrap" : "all_wrap m-auto"
        }>
        {!filtredList || !filtredList.length ? (
          <>
            {listFn ? (
              <div className="oneCollect-wrap" onClick={listFn.addNew}>
                <div className="oneCollect display-2">ADD NEW SET OF CARDS</div>
              </div>
            ) : (
              <h2>No collections</h2>
            )}
          </>
        ) : (
          filtredList.map((item) => (
            <CollectionCard
              oneSet={item}
              key={item.collection.id}
              routeOne={routeOne}
              listFn={listFn}
            />
          ))
        )}
      </div>
    </>
  );
};

export default CollectionCardsList;
