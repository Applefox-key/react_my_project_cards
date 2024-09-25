import { useEffect } from "react";

export const useOutsideClick = (boxId, callback, isAddListener = true) => {
  useEffect(() => {
    if (!boxId || !callback || !isAddListener) return;
    const handleOutsideClick = (event) => {
      if (event.target.id !== boxId) {
        callback();
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
