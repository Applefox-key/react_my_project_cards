import React, { useState } from "react";
import cl from "./Games.module.scss";
import { FcIdea, FcNoIdea } from "react-icons/fc";
import { Button } from "react-bootstrap";
const Hint = ({ text }) => {
  const [show, setShow] = useState(0);
  const switchShow = () => {
    setShow(1 - show);
  };
  return (
    <div className={cl.hint} onClick={switchShow}>
      <Button size="lg" variant={show ? "warning" : "dark"}>
        NOTE
        {show ? <FcNoIdea /> : <FcIdea />}
      </Button>

      {show ? <div className={cl.hintText}>{text}</div> : <></>}
    </div>
  );
};

export default Hint;
