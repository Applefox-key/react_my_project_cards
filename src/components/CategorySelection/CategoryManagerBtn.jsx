import React, { useState } from "react";
import { IoIosSettings } from "react-icons/io";

import cl from "./CategorySelection.module.scss";

import CategoriesManager from "./CategoriesManager";
import MyModal from "../UI/MyModal";

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
          <CategoriesManager isModal />
        </MyModal>
      )}
    </>
  );
};

export default CategoryManagerBtn;
