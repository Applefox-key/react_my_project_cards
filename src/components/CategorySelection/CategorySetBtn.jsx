import React, { useState } from "react";

import CategoriesManager from "./CategoriesManager";
import cl from "./CategorySelection.module.scss";
import MyModal from "../UI/MyModal";
import { IoIosSettings } from "react-icons/io";
const CategorySetBtn = ({ getList, icon }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div
        className={icon ? "" : cl["setting_btn"]}
        title="Categories manager"
        onClick={(e) => {
          e.stopPropagation();
          setVisible(true);
        }}>
        <p>
          {icon ? "" : "manager"} <IoIosSettings />
        </p>
      </div>

      {/* {icon ? (
        <span
          onClick={(e) => {
            e.stopPropagation();
            setVisible(true);
          }}>
          <IoIosSettings />
        </span>
      ) : (
        <div
          className={cl["setting_btn"]}
          title="Categories manager"
          onClick={(e) => {
            e.stopPropagation();
            setVisible(true);
          }}>
          manager <IoIosSettings />
        </div>
      )} */}
      {visible && (
        <MyModal
          onHide={(e) => {
            getList();
            setVisible(false);
          }}
          showmodal={visible}
          setshowmodal={setVisible}
          size="md"
          dialogClassName="h100"
          title={"Categories manager"}>
          <CategoriesManager />
        </MyModal>
      )}
    </>
  );
};

export default CategorySetBtn;
