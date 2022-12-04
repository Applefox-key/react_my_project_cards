import React, { useState } from "react";
import { useEffect } from "react";
import BaseAPI from "../../API/BaseAPI";
import { usePopup } from "../../hooks/usePopup";
import BackBtn from "../UI/BackBtn/BackBtn";
import MyTable from "../UI/table/MyTable";

const SharedColectManager = () => {
  const [list, setList] = useState();
  const setPopup = usePopup();

  const updateList = async () => {
    try {
      setList(await BaseAPI.getPublicCollectionsUser());
    } catch (error) {
      setPopup.error("something goes wrong " + error);
    }
  };
  useEffect(() => {
    updateList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rowsActons = {
    async deleteAll() {
      if (!window.confirm("Delete all collections?")) return;
      await BaseAPI.deleteUserPbColectionAll();
      setList([]);
    },
    async deleteOne(element) {
      if (!window.confirm("Delete the collection?")) return;
      await BaseAPI.deletePbColection(element.id);
      let arr = list.filter((elem) => elem.id !== element.id);
      setList(arr);
    },
  };

  return (
    <div>
      <h1>Your shared collections</h1>
      <BackBtn size="lg" />
      <div className="tableContainer">
        {list ? (
          <MyTable
            dataArray={list}
            namesArray={["name", "note"]}
            btnsArray={[
              { nameMain: "Delete all", callback: rowsActons.deleteAll },
              { name: "Delete", callback: rowsActons.deleteOne },
            ]}
          />
        ) : (
          <h5>No shared collections</h5>
        )}
      </div>
    </div>
  );
};
export default SharedColectManager;
