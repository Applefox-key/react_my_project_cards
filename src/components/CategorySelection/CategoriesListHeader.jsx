import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import MyModal from "../UI/MyModal";
import CategoriesManager from "../CategorySelection/CategoriesManager";

const CategoriesListHeader = ({ selected, list, getList, isPublic, isOne }) => {
  // const router = useNavigate();
  const [visible, setVisible] = useState(false);

  return (
    <div>
      {visible && (
        <MyModal
          onHide={(e) => {
            getList();
            setVisible(false);
          }}
          showmodal={visible}
          setshowmodal={setVisible}
          // fullscreen
          size="md"
          dialogClassName="h100"
          title={"Categories manager"}>
          <CategoriesManager categories={list} getCategories={getList} />
        </MyModal>
      )}
      <Dropdown.Toggle
        style={{ width: "150px" }}
        id="dropdown-custom-components"
        size="lg"
        variant={isOne ? "light" : "primary"}>
        {isPublic ? (
          ""
        ) : (
          <span
            onClick={(e) => {
              e.stopPropagation();
              setVisible(true);
            }}>
            ⚙
          </span>
        )}
        Category: {selected ? selected.name : ""}
      </Dropdown.Toggle>
    </div>
  );
};

export default CategoriesListHeader;
