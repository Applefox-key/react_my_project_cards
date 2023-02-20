import React from "react";
import { Image } from "react-bootstrap";
import logo from "../img/learnapp.png";
const Logo = () => {
  return (
    <div>
      <footer className="footer">
        © <Image src={logo} style={{ width: "6%" }} />
      </footer>
    </div>
  );
};

export default Logo;
