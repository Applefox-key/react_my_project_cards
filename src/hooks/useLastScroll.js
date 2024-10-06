import { useEffect } from "react";

export const useLastScroll = (items = []) => {
  useEffect(() => {
    if (items.length === 0) return;
    let scrollY = localStorage.getItem("scrollY");
    if (scrollY) {
      window.scroll({ top: parseInt(scrollY), behavior: "instant" });
      localStorage.removeItem("scrollY");
    }
  }, [items.length]);
};
