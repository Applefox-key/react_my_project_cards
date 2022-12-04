import React from "react";
import { useNavigate } from "react-router-dom";

import MyTable from "../../UI/table/MyTable";

const PublicCollectTable = ({ filtredList }) => {
  const router = useNavigate();

  const rowsActons = {
    viewContent(collection) {
      router(`/collections/pub/${collection.id}/${collection.name}`);
    },
  };

  return (
    <>
      {!filtredList ? (
        <h2>No collections</h2>
      ) : (
        <div className=" w-75 m-auto">
          <MyTable
            onRowClick={rowsActons.viewContent}
            dataArray={Array.from(filtredList, (el) => el.collection)}
            namesArray={["category", "name", "note"]}
          />
        </div>
      )}
    </>
  );
};

export default PublicCollectTable;
