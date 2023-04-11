import { useContext } from "react";
import { PopupContext } from "../context";

export const usePopup = () => {
  // eslint-disable-next-line no-unused-vars
  const { popupSetting, setPopupSettings } = useContext(PopupContext);
  const popupSuccess = (message) => {
    setPopupSettings([true, message, "success"]);
  };
  const popupError = (message) => {
    setPopupSettings([true, message, "error"]);
  };
  const popupAttention = (message) => {
    setPopupSettings([true, message, "attention"]);
  };
  return { success: popupSuccess, error: popupError, advice: popupAttention };
};
