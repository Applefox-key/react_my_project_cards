import React, { useEffect, useState } from "react";
import BaseAPI from "../../API/BaseAPI";
import { useCollectSelection } from "../../hooks/useCollectSelection";
import { useQuery } from "../../hooks/useQuery";
import cl from "./PlayLists.module.scss";
import SpinnerLg from "../UI/SpinnerLg/SpinnerLg";
import MyFilter from "../UI/MyFilter/MyFilter";
import MySwitch from "../UI/tgb/MySwitch";
import { IoHomeOutline } from "react-icons/io5";
import FilterByCategory from "../CategorySelection/FilterByCategory";
import { FaAngleDoubleLeft } from "react-icons/fa";

const AllCollectionsList = ({
  selectedIds,
  setSelectedIds,
  selectedItems,
  setSelectedItems,
}) => {
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
  const handleItemClick = (elem) => {
    if (limit === selectedIds.length && !selectedIds.includes(elem.id)) return;
    const isExist = selectedIds.includes(elem.id);
    setSelectedItems(
      isExist
        ? selectedItems.filter((item) => item.id !== elem.id)
        : [...selectedItems, elem]
    );

    setSelectedIds((prevIds) => {
      if (prevIds.includes(elem.id)) {
        return prevIds.filter((prevId) => prevId !== elem.id);
      } else {
        return [...prevIds, elem.id];
      }
    });
  };
  const handleSelectAll = () => {
    const allIds = filtredList.map((el) => el.id);
    setSelectedIds(allIds);
    setSelectedItems([...filtredList]);
  };

  const handleClearSelection = () => {
    setSelectedIds([]);
    setSelectedItems([]);
  };

  const isPubChange = () => {
    let newVal = !isPub;
    setisPub(newVal);
  };
  return (
    <>
      <div className="d-flex align-items-start">
        <div id="choosed-list" className={cl.choosedList}>
          <div className={cl.tabBox}>
            <span className="text-secondary text-center mb-0">
              Choose up to 10 collections
            </span>
            <p className="text-danger">{selectedIds.length}/10</p>{" "}
            <div>
              <button onClick={handleClearSelection}>Clear Selection</button>
            </div>
          </div>

          {/* {filtredList
          .filter((elem) => selectedIds.includes(elem.id)) */}
          {selectedItems.map((el) => (
            <div
              key={el.id}
              className={cl.selectedEl}
              onClick={() => handleItemClick(el)}>
              {el.name}
              {el.isMy && <span></span>}
            </div>
          ))}
        </div>{" "}
        {limit - selectedIds.length >= filtredList.length && (
          <button onClick={handleSelectAll}>
            <FaAngleDoubleLeft />
          </button>
        )}
        <div id="choose-list" className={cl.chooseList}>
          <div className={cl.selectionButtons}>
            <div className={cl.filter}>
              <MyFilter filter={filter} setFilter={setFilter} />
            </div>
            <FilterByCategory isPb={isPub} onSelect={setCat} />
          </div>{" "}
          <div className={cl.chooseTbl}>
            {isLoading ? (
              <SpinnerLg className="span_wrap" />
            ) : !filtredList ? (
              <h2>No collections</h2>
            ) : (
              <>
                {filtredList.map((el) => (
                  <div
                    key={el.id}
                    className={
                      selectedIds.includes(el.id)
                        ? cl.isSelected
                        : cl.isNotSelected
                    }
                    onClick={() => handleItemClick(el)}>
                    {el.name}
                    {el.isMy && (
                      <span>
                        <IoHomeOutline />
                      </span>
                    )}
                  </div>
                ))}
              </>
            )}{" "}
          </div>{" "}
          <div className="mt-2">
            <MySwitch
              checked={isPub}
              onChange={isPubChange}
              leftEl="My library"
              rightEl="Public collections"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllCollectionsList;
