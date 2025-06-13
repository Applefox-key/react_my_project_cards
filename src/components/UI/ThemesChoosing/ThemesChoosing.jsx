import React, { useRef, useState } from "react";
import cl from "./ThemesChoosing.module.scss";
import ThemesChoosingBody from "./ThemesChoosingBody";

const ThemesChoosing = ({ callback }) => {
  const [show, setShow] = useState(false);
  const ref = useRef();
  const close = () => {
    setShow(false);
  };
  return (
    <div ref={ref} className={cl.wrapBox}>
      <button
        className={cl.btn}
        onClick={(e) => {
          e.stopPropagation();
          setShow(!show);
        }}>
        ...
      </button>
      {show && (
        <ThemesChoosingBody refw={ref} close={close} callback={callback} />
      )}
    </div>
  );
};

export default ThemesChoosing;
