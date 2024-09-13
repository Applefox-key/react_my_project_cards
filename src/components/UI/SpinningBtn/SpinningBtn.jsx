import React, { useEffect, useState } from "react";
import cl from "./SpinningBtn.module.scss";
import { CSSTransition } from "react-transition-group";

const SpinningBtn = ({ child, ico, elemId, title }) => {
  const [show, setShow] = useState(false);
  const [inProp, setInProp] = useState(false);
  const onClick = (e) => {
    e.stopPropagation();
    if (show) {
      setInProp(false);
    } else {
      setShow(true);
      setInProp(true);
    }
  };

  const onExited = () => {
    setShow(false); // Скрываем элемент после завершения анимации выхода
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.id !== elemId) {
        setInProp(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cl["spinning-btn-wrap"]}>
      <div className={show ? cl["overflow-box-show"] : cl["overflow-box"]}>
        {show && (
          <CSSTransition
            in={inProp}
            appear
            onExited={onExited}
            timeout={{
              appear: 600,
              enter: 600,
              exit: 600,
            }}
            classNames="fadeB"
            unmountOnExit>
            <div className={cl["body-after-btn"]}>{child}</div>
          </CSSTransition>
        )}
      </div>
      <div>
        <button
          id={elemId}
          className={
            inProp ? cl["spinning-menu-btn-show"] : cl["spinning-menu-btn"]
          }
          onClick={onClick}>
          {!!title && <span>{title}</span>}
          <div className={cl["ico-wrap"]}>
            <div className={cl.ico}>{ico}</div>
          </div>
        </button>
        <div />
      </div>
    </div>
  );
};

export default SpinningBtn;
