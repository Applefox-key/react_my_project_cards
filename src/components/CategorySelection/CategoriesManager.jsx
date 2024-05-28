import React, { useState } from "react";
import { useEffect } from "react";
import "../../styles/viewForms.scss";
import { usePopup } from "../../hooks/usePopup";
import BaseAPI from "../../API/BaseAPI";
import { FaLayerGroup } from "react-icons/fa";
import BackMenuBtn from "../UI/tgb/BackMenuBtn";
import { HiPlus } from "react-icons/hi";
import cl from "./CategorySelection.module.scss";
import CategoryNameInput from "./CategoryNameInput";
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

  const hh = (el) => {
    return editMode === null ? false : editMode.id === el.id;
  };
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
      // editOn(newEl);
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
      {categoriesTbl.length && (
        <div className={cl["cat-wrap"]}>
          {categoriesTbl.map((el) => (
            <div
              key={el.id}
              className={cl["cat-row"]}
              // onClick={() => rowsActons.changelEdit(el)}
            >
              <div className={cl["cat-header"]}>
                {" "}
                <FaLayerGroup />
                {/* <FaLayerGroup className="mt-2" /> */}
                <div className={cl["cat-name"]}>
                  <CategoryNameInput
                    el={el}
                    edit={rowsActons.edit}
                    isInput={hh(el)}
                    setIsInput={rowsActons.changelEdit}
                  />
                </div>
                {editMode === null && (
                  <div className="d-flex">
                    <button
                      className={cl.hidenBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        rowsActons.changelEdit(el);
                      }}>
                      edit name
                    </button>{" "}
                    <button
                      className={cl.hidenBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        rowsActons.deleteOne(el);
                      }}>
                      delete
                    </button>
                    <span>{el.collection_count}</span>
                  </div>
                )}
              </div>
              {/* <div className="listBody">
                {el.collections.map((col) => (
                  <div className="listItem" key={col.id}>
                    <span>{col.name}</span>
                  </div>
                ))}
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default CategoriesManager;
