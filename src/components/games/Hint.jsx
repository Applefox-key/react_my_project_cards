import React, { useState } from "react";
import cl from "./Games.module.scss";
import { Button } from "react-bootstrap";
import Draggable from "react-draggable";
import { WiMoonThirdQuarter } from "react-icons/wi";
import { TbBulb } from "react-icons/tb";

import { useHintPosition } from "../../hooks/useHintPosition";

const Hint = ({ text }) => {
  const [show, setShow] = useState(0);
  const switchShow = () => {
    setShow(1 - show);
  };
  useHintPosition();

  return (
    <Draggable
      cancel="#cbtn"
      defaultPosition={{
        x: window.visualViewport.width * 0.01,
        y: -window.visualViewport.height * 0.02,
      }}>
      <div className={cl.hint}>
        {<WiMoonThirdQuarter className={cl.handle} />}
        {/* {<IoFlashSharp className={cl.handle} />} */}
        <Button
          onClick={switchShow}
          size="lg"
          id="cbtn"
          variant={show ? "warning" : "dark"}
          className={cl.hintbtn}>
          <span>NOTE</span>
          {/* <FcIdea /> */}
          <TbBulb />
        </Button>
        {!!show && <div className={cl.hintText}>{text}</div>}
      </div>
    </Draggable>
  );
};

export default Hint;
