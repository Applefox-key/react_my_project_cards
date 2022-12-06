import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyDropDownBtn = ({ arr, title, variant, dis, size = "lg", ...props }) => {
  const router = useNavigate();
  return (
    <DropdownButton
      {...props}
      disabled={dis}
      size={size}
      variant={variant}
      title={title}
      style={{ fontSize: "3rem" }}>
      {arr.map((item, i) =>
        item.href || item.onClick ? (
          <Dropdown.Item
            style={{ fontSize: "1.5rem" }}
            key={i}
            // href={item.href ? item.href : ""}
            // onClick={item.onClick}
            onClick={item.onClick ? item.onClick : () => router(item.href)}>
            {item.name}
          </Dropdown.Item>
        ) : (
          <Dropdown.Divider key={i} />
        )
      )}
    </DropdownButton>
  );
};

export default MyDropDownBtn;
