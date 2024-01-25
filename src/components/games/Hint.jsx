import React, { useState } from "react";
import cl from "./Games.module.scss";
import { FcIdea } from "react-icons/fc";
import { Button } from "react-bootstrap";
import Draggable from "react-draggable";

const Hint = ({ text }) => {
  const [show, setShow] = useState(0);
  const switchShow = () => {
    setShow(1 - show);
  };
  return (
    <Draggable
      cancel="#cbtn"
      defaultPosition={{
        x: window.visualViewport.width * 0.2,
        y: window.visualViewport.height * 0,
      }}>
      <div className={cl.hint}>
        <div>{<FcIdea />}</div>
        <Button
          onClick={switchShow}
          size="lg"
          id="cbtn"
          variant={show ? "warning" : "dark"}
          className={cl.hintbtn}>
          NOTE
          {/* {show ? <FcIdea className={cl.hintOn} /> : <FcIdea />} */}
        </Button>
        {show ? <div className={cl.hintText}>{text}</div> : <></>}
      </div>
    </Draggable>
  );
};

export default Hint;
