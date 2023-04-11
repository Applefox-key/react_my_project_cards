import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import MyModal from "../UI/MyModal";
import CategoriesManager from "../CategorySelection/CategoriesManager";
import cl from "./CategorySelection.module.scss";
import "../../styles/collectMenu.scss";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineControl } from "react-icons/ai";
const CategoriesListHeader = ({ selected, list, getList, isPublic, isOne }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
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
          <CategoriesManager categories={list} getCategories={getList} />
        </MyModal>
      )}
      <Dropdown.Toggle
        className={cl.div_width + " " + cl.dropbtn}
        id="dropdown-custom-components"
        size="lg"
        variant="light">
        {isPublic ? (
          ""
        ) : (
          <span
            onClick={(e) => {
              e.stopPropagation();
              setVisible(true);
            }}>
            <AiOutlineControl />
          </span>
        )}
        Category:
        {selected ? <div className={cl.selCat}>{selected.name}</div> : ""}
      </Dropdown.Toggle>
    </>
  );
};

export default CategoriesListHeader;
