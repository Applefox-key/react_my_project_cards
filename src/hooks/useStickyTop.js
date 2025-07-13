import { useEffect } from "react";

export function useStickyTop() {
  useEffect(() => {
    const nav = document.querySelector(".mainNavbar_topNav__3KZtL");

    const updateStickyOffset = () => {
      if (nav) {
        const height = nav.offsetHeight;
        document.documentElement.style.setProperty(
          "--navbar-height",
          `${height}px`
        );
      }
    };

    if (nav) {
      updateStickyOffset(); // on mount
      const observer = new ResizeObserver(updateStickyOffset);
      observer.observe(nav);

      return () => {
        observer.disconnect();
      };
    }
  }, []);
}
