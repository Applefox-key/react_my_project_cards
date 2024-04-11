import React from "react";
import CollectionCard from "./CollectionCard";
import "../../styles/viewForms.scss";
const CollectionsList = ({ filtredList, routeOne, listFn, sort }) => {
  const isNumb = (str) => /^[0-9]/.test(str);

  const titleRow = (item, i) => {
    if (!sort) return <></>;
    if (sort === "category") {
      const cur = item.collection.category
        ? item.collection.category
        : "no category";
      const prew =
        i === 0
          ? ""
          : filtredList[i - 1].collection.category
          ? filtredList[i - 1].collection.category
          : "no category";
      if (cur !== prew) return <p className="categoryChapter">{cur}</p>;
    }
    if (sort === "name") {
      const cur = isNumb(item.collection.name[0])
        ? "0-9"
        : item.collection.name[0].toUpperCase();
      const prew =
        i === 0
          ? ""
          : isNumb(filtredList[i - 1].collection.name[0])
          ? "0-9"
          : filtredList[i - 1].collection.name[0].toUpperCase();
      // debugger;
      if (cur !== prew) return <div className="letterChapter">{cur}</div>;
    }
    return <></>;
  };
  return (
    <>
      <div
        className={
          window.location.hash === "#1" ? "tbl_view " : "card-view m-auto"
        }>
        {!filtredList || !filtredList.length ? (
          <>
            {listFn ? (
              <div className="oneCollect-wrap" onClick={listFn.addNew}>
                <div className="oneCollect addNew">ADD NEW SET OF CARDS</div>
              </div>
            ) : (
              <h2>No collections</h2>
            )}
          </>
        ) : (
          filtredList.map((item, i) => (
            <div className="chapterWrap" key={i}>
              {titleRow(item, i)}
              <CollectionCard
                oneSet={item}
                key={item.collection.id}
                routeOne={routeOne}
                listFn={listFn}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default CollectionsList;
