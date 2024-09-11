import React from "react";
import CategoryNameInput from "./CategoryNameInput";
import cl from "./CategorySelection.module.scss";
import { GO_TO } from "../../router/routes";
import { useNavigate } from "react-router-dom";
import { saveOneSetting } from "../../utils/pageSettings";
import { CSSTransition } from "react-transition-group";
import { BiLabel } from "react-icons/bi";
const CategoryManagerContent = ({ rowsActons, categoriesTbl, editMode }) => {
  const router = useNavigate();
  const hh = (el) => {
    return editMode === null ? false : editMode.id === el.id;
  };
  return (
    <CSSTransition
      appear={true}
      in={"true"}
      timeout={1000}
      classNames="game"
      unmountOnExit>
      <div>
        {categoriesTbl.length && (
          <div className={cl["cat-wrap"]}>
            {categoriesTbl.map((el) => (
              <div
                key={el.id}
                className={cl["cat-row"]}
                // onClick={() => rowsActons.changelEdit(el)}>
                onClick={() => {
                  saveOneSetting("selectedCategorymy", el);
                  router(GO_TO.myCollect);
                }}>
                <div className={cl["cat-header"]}>
                  <BiLabel />
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
              </div>
            ))}
          </div>
        )}
      </div>
    </CSSTransition>
  );
};

export default CategoryManagerContent;
