import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseAPI from "../../../API/BaseAPI";

import { usePopup } from "../../../hooks/usePopup";

import MyTable from "../../UI/table/MyTable";
import { GO_TO } from "../../../router/routes";

const CollectionsTable = ({
  filtredList,
  collectionList,
  setCollectionList,
  selectedCategory,
  getCollections,
}) => {
  const [editMode, setEditMode] = useState(null);
  const setPopup = usePopup();

  const router = useNavigate();

  const editOn = (content) => {
    setEditMode({
      content: content,
      names: ["name", "note"],
      edit: rowsActons.edit,
    });
  };
  const rowsActons = {
    async addRow() {
      if (editMode) return;
      const newEl = {
        id: "new",
        name: "",
        category: selectedCategory ? selectedCategory.name : "",
        categoryid: selectedCategory ? selectedCategory.id : "",
        note: "",
      };
      setCollectionList([
        { collection: newEl, content: {} },
        ...collectionList,
      ]);
      editOn(newEl);
    },
    async add(newC) {
      if (!newC.name) {
        setPopup.error("please fill in name");
        return;
      }
      await BaseAPI.createCollection(newC);
      getCollections();
      setEditMode(null);
    },
    async deleteAll() {
      if (!window.confirm("Delete all collections with content?")) return;
      try {
        await BaseAPI.deleteColectionAll();
        setCollectionList([]);
      } catch (error) {
        setPopup.error("something goes wrong");
      }
    },
    async deleteOne(element) {
      if (!window.confirm("Delete the category?")) return;
      try {
        await BaseAPI.deleteColection(element.id);
        setCollectionList(
          collectionList.filter((elem) => elem.collection.id !== element.id)
        );
      } catch (error) {
        setPopup.error("something goes wrong");
      }
    },
    async edit(newV) {
      if (!newV) {
        //just setEditMode  null
      } else if (newV === "newCancel") {
        setCollectionList(collectionList.filter((el) => el.id !== "new"));
      } else if (newV.id === "new") {
        rowsActons.add(newV);
        return;
      }
      setEditMode(null);

      // await BaseAPI.editCategory(newV, newV.id);
      // getCategories();
      //   route(`/categories`);
    },
    viewContent(collection) {
      router(`${GO_TO.myCollect}/${collection.id}/${collection.name}`);
    },
  };

  return (
    <>
      {!filtredList ? (
        <h2>No collections</h2>
      ) : (
        <div className="m-auto" style={{ width: "85%" }}>
          <MyTable
            classtbl="lavanderBack"
            onRowClick={editOn}
            edit={editMode}
            dataArray={Array.from(filtredList, (el) => el.collection)}
            namesArray={["category", "name", "note"]}
            btnsArray={[
              { nameMain: "Add row", callback: rowsActons.addRow },
              { nameMain: "Delete all", callback: rowsActons.deleteAll },
              {
                name: "🔎",
                callback: rowsActons.viewContent,
                variant: "outline-light",
              },
              {
                name: "❌",
                callback: rowsActons.deleteOne,
                variant: "outline-light",
              },
            ]}
          />
        </div>
      )}
    </>
  );
};

export default CollectionsTable;
