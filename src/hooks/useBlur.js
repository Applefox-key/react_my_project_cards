import { useEffect, useRef } from "react";

const useBlur = (callback) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const handleBlur = (event) => {
      if (
        elementRef.current &&
        !elementRef.current.contains(event.relatedTarget)
      ) {
        callback();
      }
    };

    document.addEventListener("focusout", handleBlur);

    return () => {
      document.removeEventListener("focusout", handleBlur);
    };
  }, [callback]);

  return elementRef;
};

export default useBlur;
