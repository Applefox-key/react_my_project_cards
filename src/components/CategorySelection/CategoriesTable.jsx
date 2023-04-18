import React, { useState } from "react";
import { useEffect } from "react";
import BaseAPI from "../../API/BaseAPI";
import { usePopup } from "../../hooks/usePopup";
import MyTable from "../UI/table/MyTable";

const CategoriesTable = ({ categoriesTbl, setCategoriesTbl }) => {
  const [editMode, setEditMode] = useState(null);
  const setPopup = usePopup();

  const updateCategories = async () => {
    try {
      setCategoriesTbl(await BaseAPI.getCategoriesList());
    } catch (error) {
      setPopup.error("something goes wrong");
    }
  };
  useEffect(() => {
    updateCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editOn = (content) => {
    setEditMode({
      content: content,
      names: ["name"],
      edit: rowsActons.edit,
    });
  };

  const rowsActons = {
    async addRow() {
      if (editMode) return;
      const newEl = {
        id: "new",
        name: "",
      };
      setCategoriesTbl([newEl, ...categoriesTbl]);
      editOn(newEl);
    },
    async add(newC) {
      if (!newC.name) {
        setPopup.error("please fill in name");
        return;
      }
      await BaseAPI.createCategory(newC.name);
      setEditMode(null);
      updateCategories();
    },
    async deleteAll() {
      if (!window.confirm("Delete all categories?")) return;
      await BaseAPI.deleteCategoriesAll();
      setCategoriesTbl([]);
    },
    async deleteOne(element) {
      if (!window.confirm("Delete the category?")) return;
      await BaseAPI.deleteCategory(element.id);
      let arr = categoriesTbl.filter((elem) => elem.id !== element.id);
      setCategoriesTbl(arr);
    },
    async edit(newV) {
      if (!newV) {
      } else if (newV === "newCancel") {
        setCategoriesTbl(categoriesTbl.filter((el) => el.id !== "new"));
      } else if (newV.id === "new") {
        rowsActons.add(newV);
        return;
      } else {
        await BaseAPI.editCategory(newV, newV.id);
        setCategoriesTbl();
      }
      setEditMode(null);
    },
  };

  return (
    <div>
      {!categoriesTbl ? (
        <h2>No collections</h2>
      ) : (
        <MyTable
          onRowClick={editOn}
          edit={editMode}
          dataArray={categoriesTbl}
          namesArray={["name"]}
          btnsArray={[
            { nameMain: "Add row", callback: rowsActons.addRow },
            { nameMain: "Delete all", callback: rowsActons.deleteAll },
            { name: "Delete", callback: rowsActons.deleteOne },
          ]}
        />
      )}
    </div>
  );
};
export default CategoriesTable;
