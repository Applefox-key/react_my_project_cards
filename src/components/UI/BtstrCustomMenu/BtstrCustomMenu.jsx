import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const BtstrCustomMenu = ({ title, arr }) => {
  // The forwardRef is important!!
  // Dropdown needs access to the DOM node in order to position the Menu
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}>
      {children}
      &#x25bc;
    </a>
  ));

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        {title}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {arr.map((item, i) =>
          item.href || item.onClick ? (
            <Dropdown.Item
              key={i}
              href={item.href ? item.href : ""}
              onClick={item.onClick}>
              {item.name}
            </Dropdown.Item>
          ) : (
            <Dropdown.Divider key={i} />
          )
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default BtstrCustomMenu;
