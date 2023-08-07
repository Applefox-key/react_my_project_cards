import React, { useEffect, useState } from "react";
import cl from "../SideBar.module.scss";
import { useQuery } from "../../../hooks/useQuery";
import BaseAPI from "../../../API/BaseAPI";
import MySpinner from "../../UI/MySpinner";
import CategoryFilter from "../../CategorySelection/CategoryFilter";
import CategoryMiniMenu from "./CategoryMiniMenu";
import { useMemo } from "react";
import CategorySetBtn from "../../CategorySelection/CategorySetBtn";
import { RiDeleteBin2Line } from "react-icons/ri";

const SideBarList = ({ onSelect, colCat = "", colCatPub = "" }) => {
  const isPublic = window.location.pathname.includes("pub");
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState("");
  const [isMenu, setIsMenu] = useState(false);
  const [selected, setSelected] = useState(isPublic ? colCatPub : colCat);
  const [getList, isLoadingCat] = useQuery(async () => {
    const cat = await BaseAPI.getCategoriesList(isPublic);
    setList(cat);
  });

  const classGenerator = (item) => {
    const selectedid = isPublic ? colCatPub : colCat;
    const active_id = !selectedid ? "" : selectedid.id;
    const item_id = item.id;

    return [
      cl["link-box"],
      active_id === item_id ? cl["link-box-active"] : "",
    ].join(" ");
  };
  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPublic]);

  const deleteOne = async (element) => {
    if (!window.confirm("Delete this label?")) return;
    await BaseAPI.deleteCategory(element.id);
    let arr = list.filter((elem) => elem.id !== element.id);
    setList(arr);
  };
  const deleteAll = async () => {
    if (!window.confirm("Delete all categories?")) return;
    await BaseAPI.deleteCategoriesAll();
    setList([]);
  };
  const addUserCategory = () => {
    BaseAPI.createCategory(filter);
    onSelectItem(filter, 0);
    getList();
  };
  const onSelectItem = (value = "", close = 1) => {
    setFilter("");
    setSelected(value);
    onSelect(value);
  };
  const filtredList = useMemo(
    () =>
      list.filter(
        (el1) => !filter || el1.name.toLowerCase().startsWith(filter)
      ),
    [filter, list]
  );
  return (
    <div
      tabIndex={-1}
      onBlur={(e) => {
        if (!e.relatedTarget) setIsMenu("");
      }}>
      <div className={cl["link-box"]}>
        {" "}
        <h3>
          {" "}
          <CategorySetBtn getList={getList} icon={true} />
          CATEGORIES
        </h3>
        {!isPublic && (
          <CategoryMiniMenu
            isMenu={isMenu === "all"}
            setIsMenu={setIsMenu}
            el={{ id: "all" }}
            deleteFn={deleteAll}
          />
        )}{" "}
      </div>
      <CategoryFilter filter={filter} setFilter={setFilter} />
      {!filter && selected && (
        <div
          className={cl.addingLink}
          onClick={() => {
            onSelectItem();
          }}>
          {"...show all categories ♾️"}
        </div>
      )}
      {isLoadingCat ? (
        <MySpinner />
      ) : (
        <>
          {!filtredList.length ? (
            <div
              className={cl.addingLink}
              variant="light"
              onClick={addUserCategory}>
              + add new category
            </div>
          ) : (
            <div className={cl["catlist-box"]}>
              {filtredList.map((el) => (
                <div
                  className={classGenerator(el)}
                  key={el.id}
                  onClick={() => onSelectItem(el)}>
                  <div>
                    <span>✦</span>
                    {el.name}
                  </div>
                  {!isPublic && (
                    <button
                      title="delete label (collections will not be deleted)"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteOne(el);
                      }}>
                      <RiDeleteBin2Line />
                      {/* {el.id !== "all" ? "delete label" : "delete all"} */}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default SideBarList;
