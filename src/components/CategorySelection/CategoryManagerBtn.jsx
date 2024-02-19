import React, { useState } from "react";

import CategoriesManager from "./CategoriesManager";
import cl from "./CategorySelection.module.scss";
import MyModal from "../UI/MyModal";
import { IoIosSettings } from "react-icons/io";

const CategoryManagerBtn = ({ getList, icon }) => {
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
            if (getList) getList();
            setVisible(false);
          }}
          showmodal={visible}
          setshowmodal={setVisible}
          size="md"
          dialogClassName="modal-h100"
          title={"Categories manager"}>
          <CategoriesManager />
        </MyModal>
      )}
    </>
  );
};

export default CategoryManagerBtn;
