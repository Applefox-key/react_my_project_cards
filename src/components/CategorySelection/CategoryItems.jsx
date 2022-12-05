import React from "react";
import { Button, Dropdown } from "react-bootstrap";

const CategoryItems = ({ list, add, selected, onSelect, isPublic }) => {
  return (
    <>
      {list.length ? (
        list.map((item) => (
          <Dropdown.Item
            style={{ fontSize: "1.5rem" }}
            active={selected.id === item.id}
            key={item.id}
            eventKey={item.id}
            onClick={() => {
              onSelect(item);
            }}>
            {item.name}
          </Dropdown.Item>
        ))
      ) : isPublic ? (
        <></>
      ) : (
        <Button className="w-100" variant="primary" onClick={add}>
          add new category
        </Button>
      )}
    </>
  );
};

export default CategoryItems;
