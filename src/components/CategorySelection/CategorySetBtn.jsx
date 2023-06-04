import React, { useState } from "react";
import MyModal from "../UI/MyModal";
import CategoriesManager from "../CategorySelection/CategoriesManager";
import { AiOutlineControl } from "react-icons/ai";
import cl from "./CategorySelection.module.scss";
const CategorySetBtn = ({ getList, icon }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      {icon ? (
        <span
          onClick={(e) => {
            e.stopPropagation();
            setVisible(true);
          }}>
          <AiOutlineControl />
        </span>
      ) : (
        <div
          className={cl["setting_btn"]}
          title="Categories manager"
          onClick={(e) => {
            e.stopPropagation();
            setVisible(true);
          }}>
          manager <AiOutlineControl />
        </div>
      )}
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
