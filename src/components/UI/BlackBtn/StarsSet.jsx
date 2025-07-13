import React from "react";
import { FaCheck, FaRegStar, FaStar } from "react-icons/fa";
import cl from "./BackBtn.module.scss";
import Rate from "../../games/Rate";
const StarsSet = ({ choosen, callback }) => {
  const arr = [1, 2, 3, 4, 5];
  const changeRate = (e, el) => {
    if (!callback) return;
    e.stopPropagation();
    callback(el);
  };
  return (
    <>
      {arr.map((el, i) => (
        <div
          key={i}
          onClick={(e) => changeRate(e, el)}
          className={
            choosen !== null && callback && choosen.includes(el)
              ? cl.choosen
              : ""
          }>
          {callback ? (
            <>
              <Rate
                classN={cl["yellow-star"]}
                initialValue={i}
                isSmall
                notEditable
              />
              {choosen && choosen.includes(el) ? <FaCheck /> : <></>}
            </>
          ) : choosen !== null && choosen.includes(el) ? (
            <FaStar />
          ) : (
            <FaRegStar />
          )}
        </div>
      ))}
    </>
  );
};

export default StarsSet;
