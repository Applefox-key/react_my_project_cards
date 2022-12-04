import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import BaseAPI from "../../API/BaseAPI";
import MyTable from "../UI/table/MyTable";

const AdminPbCollection = () => {
  const [content, setContent] = useState();
  const getpb = async () => {
    let res = await BaseAPI.getPublicCollections();
    if (res.error) return [];
    setContent(res);
  };
  const collDelete = async (col) => {
    let res = await BaseAPI.deletePbColection(col.id);
    if (res.error) return [];
    getpb();
  };
  useEffect(() => {
    getpb();
  }, []);
  return (
    <div>
      <h1>AdminPbCollection</h1>
      {content ? (
        <MyTable
          //   onRowClick={editOn}
          //   edit={editMode}
          dataArray={content}
          namesArray={["id", "name", "note"]}
          btnsArray={[
            //   { nameMain: "Add row", callback: addRow },
            //   { nameMain: "Delete all", callback: deleteAllContent },
            // { name: "Edit", callback: editOn },
            //   { name: "Card", callback: openCard },
            { name: "Delete", callback: collDelete },
          ]}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default AdminPbCollection;
