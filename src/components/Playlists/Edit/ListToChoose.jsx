import React, { useEffect, useState } from "react";
import cl from "../PlayLists.module.scss";
import { IoHomeOutline } from "react-icons/io5";
import MySwitch from "../../UI/tgb/MySwitch";
import FilterByCategory from "../../CategorySelection/FilterByCategory";
import MyFilter from "../../UI/MyFilter/MyFilter";
import { useQuery } from "../../../hooks/useQuery";
import { useCollectSelection } from "../../../hooks/useCollectSelection";
import BaseAPI from "../../../API/BaseAPI";
import SpinnerLg from "../../UI/SpinnerLg/SpinnerLg";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { playlistSetMax } from "../../../constants/defaultSettings";

const ListToChoose = ({ selectedIds, show, onClickFns }) => {
  const [filter, setFilter] = useState("");
  const [cat, setCat] = useState("");
  const [list, setlist] = useState([]);
  const [isPub, setisPub] = useState(false);

  const [getColl, isLoading] = useQuery(async () => {
    const col = isPub
      ? await BaseAPI.getPublicCollections()
      : await BaseAPI.getCollectionsList();
    setlist(col);
  });

  useEffect(() => {
    getColl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getColl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPub]);
  const isPubChange = () => {
    let newVal = !isPub;
    setisPub(newVal);

    const isReload = !!cat || !!filter;
    if (!!cat) setCat("");
    if (!!filter) setFilter("");
    if (isReload) getColl();
  };
  const filtredList = useCollectSelection(list, cat, filter);
  return (
    <>
      {playlistSetMax - selectedIds.length >= filtredList.length &&
        !!filtredList.length && (
          <button
            className={cl.addBtn}
            onClick={() => onClickFns.handleSelectAll(filtredList)}>
            <FaAngleDoubleLeft />
          </button>
        )}
      <div
        id="choose-list"
        className={show ? cl.chooseListShow : cl.chooseList}>
        <div className={cl.selectionButtons}>
          <MySwitch
            checked={isPub}
            onChange={isPubChange}
            leftel="My library"
            rightel="Public library"
          />
          <div className={cl.filterButtons}>
            <FilterByCategory isPb={isPub} onSelect={setCat} />
            <div className={cl.filter}>
              <MyFilter filter={filter} setFilter={setFilter} />
            </div>
          </div>
        </div>
        <div className={cl.chooseTbl}>
          {isLoading ? (
            <SpinnerLg className="span_wrap" />
          ) : !filtredList ? (
            <h2>No collections</h2>
          ) : (
            filtredList.map((el) => (
              <div
                key={el.id}
                className={
                  selectedIds.includes(el.id) ? cl.isSelected : cl.isNotSelected
                }
                onClick={() => onClickFns.handleItemClick(el)}>
                {el.name}
                {!!el.isMy && <IoHomeOutline />}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ListToChoose;
