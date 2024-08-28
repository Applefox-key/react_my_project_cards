import React, { useState } from "react";
import { useEffect } from "react";
import "../../styles/viewForms.scss";
import { usePopup } from "../../hooks/usePopup";
import BaseAPI from "../../API/BaseAPI";
import BackMenuBtn from "../UI/tgb/BackMenuBtn";
import { HiPlus } from "react-icons/hi";
import CategoryManagerContent from "./CategoryManagerContent";

const CategoriesManager = ({ isModal = false }) => {
  const [categoriesTbl, setCategoriesTbl] = useState([]);
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

  const rowsActons = {
    changelEdit(val) {
      if (val === null)
        if (editMode.id === "new") {
          setCategoriesTbl(categoriesTbl.filter((el) => el.id !== "new"));
        }
      setEditMode(val);
    },
    async addRow() {
      if (editMode) return;
      const newEl = {
        id: "new",
        name: "",
      };
      setCategoriesTbl([newEl, ...categoriesTbl]);
      setEditMode(newEl);
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
        updateCategories();
      }
      setEditMode(null);
    },
  };

  return (
    <div>
      {!isModal && (
        <div className="menufind mt-4">
          <h1>My library / Categories manager</h1>
          <div>
            <button
              className="viewBtn"
              data-title="Add new category"
              onClick={(e) => {
                e.stopPropagation();
                rowsActons.addRow();
              }}>
              <HiPlus />
            </button>
            <BackMenuBtn />
          </div>
        </div>
      )}
      <CategoryManagerContent
        rowsActons={rowsActons}
        categoriesTbl={categoriesTbl}
        editMode={editMode}
      />
    </div>
  );
};
export default CategoriesManager;
