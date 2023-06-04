import React, { useEffect, useState } from "react";
import BaseAPI from "../../API/BaseAPI";
import { useCollectSelection } from "../../hooks/useCollectSelection";
import { useQuery } from "../../hooks/useQuery";
import cl from "./PlayLists.module.scss";
import SpinnerLg from "../UI/SpinnerLg/SpinnerLg";
import MyFilter from "../UI/MyFilter/MyFilter";
import CategorySelection from "../CategorySelection/CategorySelection";

const AllCollectionsList = ({ selectedIds, setSelectedIds }) => {
  const limit = 10;
  const [list, setlist] = useState([]);
  const [filter, setFilter] = useState("");
  const [cat, setCat] = useState("");
  const [isPub, setisPub] = useState(false);

  const [getColl, isLoading] = useQuery(async () => {
    const col = isPub
      ? await BaseAPI.getPublicCollections()
      : await BaseAPI.getCollectionsList();
    setlist(col);
  });
  const filtredList = useCollectSelection(list, cat, filter);
  useEffect(() => {
    getColl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getColl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, cat, isPub]);
  const handleItemClick = (id) => {
    setSelectedIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((prevId) => prevId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };
  const handleSelectAll = () => {
    const allIds = filtredList.map((el) => el.id);
    setSelectedIds(allIds);
  };

  const handleClearSelection = () => {
    setSelectedIds([]);
  };
  const setisPublic = (val) => {
    setisPub(val);
    setCat("");
  };
  return (
    <>
      {" "}
      <div className="flex-standart  bg-light mb-1">
        <h3 className="text-secondary">Choose up to 10 collections</h3>{" "}
        <h5 className="text-danger">
          left........{limit - selectedIds.length}
        </h5>
      </div>
      <div className={cl.tabBox}>
        {" "}
        <div
          className={!isPub ? cl.left : cl.tab}
          onClick={(e) => setisPublic(false)}>
          My
        </div>
        <div
          className={isPub ? cl.right : cl.tab}
          onClick={(e) => setisPublic(true)}>
          Public
        </div>
      </div>
      <div className={cl.selectionButtons}>
        <div className={cl.filter}>
          <MyFilter filter={filter} setFilter={setFilter} />
        </div>
        <div>
          <CategorySelection isPb={isPub} onSelect={setCat} />
        </div>
        <div>
          {limit - selectedIds.length >= filtredList.length && (
            <button onClick={handleSelectAll}>Select All</button>
          )}
          <button onClick={handleClearSelection}>Clear Selection</button>
        </div>
      </div>
      {isLoading ? (
        <SpinnerLg className="span_wrap" />
      ) : !filtredList ? (
        <h2>No collections</h2>
      ) : (
        <div className={cl.tblCollections}>
          {filtredList.map((el) => (
            <div
              key={el.id}
              className={
                selectedIds.includes(el.id) ? cl.isSelected : cl.isNotSelected
              }
              onClick={() => handleItemClick(el.id)}>
              {el.name}
              {el.isMy && <span></span>}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AllCollectionsList;
