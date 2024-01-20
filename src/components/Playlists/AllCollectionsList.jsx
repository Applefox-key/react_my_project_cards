import React, { useEffect, useState } from "react";
import BaseAPI from "../../API/BaseAPI";
import { useCollectSelection } from "../../hooks/useCollectSelection";
import { useQuery } from "../../hooks/useQuery";
import cl from "./PlayLists.module.scss";
import SpinnerLg from "../UI/SpinnerLg/SpinnerLg";
import MyFilter from "../UI/MyFilter/MyFilter";
import CategorySelection from "../CategorySelection/CategorySelection";
import MySwitch from "../UI/tgb/MySwitch";
import { IoHomeOutline } from "react-icons/io5";

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

  const isPubChange = () => {
    let newVal = !isPub;
    setisPub(newVal);
  };
  return (
    <>
      <div className={cl.selectionButtons}>
        {" "}
        <div className={cl.filter}>
          <MyFilter filter={filter} setFilter={setFilter} />
        </div>
        <div>
          <CategorySelection isPb={isPub} onSelect={setCat} />
        </div>{" "}
        <p className="text-secondary">Choose up to 10 collections</p>
      </div>{" "}
      <div className="d-flex align-items-start">
        <div id="choose-list" className={cl.chooseList}>
          <div className={cl.tabBox}>
            <MySwitch
              checked={isPub}
              onChange={isPubChange}
              leftEl="My library"
              rightEl="Public collections"
            />
          </div>

          <div className={cl.tblCollections}>
            {isLoading ? (
              <SpinnerLg className="span_wrap" />
            ) : !filtredList ? (
              <h2>No collections</h2>
            ) : (
              <div>
                {filtredList.map((el) => (
                  <div
                    key={el.id}
                    className={
                      selectedIds.includes(el.id)
                        ? cl.isSelected
                        : cl.isNotSelected
                    }
                    onClick={() => handleItemClick(el.id)}>
                    {el.name}
                    {el.isMy && (
                      <span>
                        <IoHomeOutline />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}{" "}
          </div>
        </div>
        <div id="choosed-list" className={cl.choosedList}>
          <div className={cl.tabBox}>
            <p className="text-danger">{selectedIds.length}/10</p>
            <div>
              {limit - selectedIds.length >= filtredList.length && (
                <button onClick={handleSelectAll}>Select All</button>
              )}
              <button onClick={handleClearSelection}>Clear Selection</button>
            </div>
          </div>

          {filtredList
            .filter((elem) => selectedIds.includes(elem.id))
            .map((el) => (
              <div
                key={el.id}
                className={cl.selectedEl}
                onClick={() => handleItemClick(el.id)}>
                {el.name}
                {el.isMy && <span></span>}
              </div>
            ))}
        </div>{" "}
      </div>
    </>
  );
};

export default AllCollectionsList;
