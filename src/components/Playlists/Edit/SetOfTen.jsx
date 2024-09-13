import React from "react";
import cl from "../PlayLists.module.scss";

const SetOfTen = ({ selectedItems, show, onClickFns }) => {
  const { handleItemClick, handleClick } = onClickFns;
  return (
    <>
      <div id="choosed-list" className={cl.choosedList}>
        {/* <div className={cl.tabBox} onClick={handleClick}>
    <span className="text-secondary text-center mb-0">
      Choose up to 10 collections
    </span>
    <p className="text-danger">{selectedIds.length}/10</p>{" "}
  </div> */}
        <div className={show ? cl.choosedItems : cl.choosedItemsShow}>
          {selectedItems.length < 10 &&
            Array.from(
              { length: 10 - selectedItems.length },
              (_, i) => i++
            ).map((el) => (
              <div key={el.id} className={cl.empty} onClick={handleClick} />
            ))}
          {selectedItems.map((el) => (
            <div
              key={el.id}
              className={cl.selectedEl}
              onClick={() => handleItemClick(el)}>
              {el.name}
              {/* {!!el.isMy && <span></span>} */}
            </div>
          ))}
        </div>
      </div>{" "}
    </>
  );
};

export default SetOfTen;
