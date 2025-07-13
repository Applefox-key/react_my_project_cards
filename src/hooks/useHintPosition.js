import { useEffect } from "react";

export function useHintPosition() {
  useEffect(() => {
    const nav = document.querySelector(".menuField");

    const updateStickyOffset = () => {
      if (nav) {
        const height = nav.offsetHeight;
        document.documentElement.style.setProperty(
          "--hint-top",
          `${height + 55}px`
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
