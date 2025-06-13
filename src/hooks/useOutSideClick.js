import { useEffect } from "react";

export const useOutsideClick = (ref, callback, isAddListener = true) => {
  useEffect(() => {
    if (!ref || !callback || !isAddListener) return;
    const handleOutsideClick = (event) => {
      event.stopPropagation();
      if (ref.current && !ref.current.contains(event.target)) {
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
