import React, { useContext } from "react";
import { PopupContext } from "../../../context";
import cl from "../popup/Popup.module.css";

const Popup = () => {
  const { popupSettings, setPopupSettings } = useContext(PopupContext);
  let [show, message, variant] = [false, "", "success"];
  if (popupSettings) {
    [show, message, variant] = popupSettings;
  }
  if (show)
    setTimeout(() => {
      setPopupSettings([false, "", ""]);
    }, 5000);

  return show ? (
    <div className={[cl.empty, cl.toast, cl[variant]].join(" ")}>{message}</div>
  ) : (
    <div className={cl.empty} />
  );
};

export default Popup;
