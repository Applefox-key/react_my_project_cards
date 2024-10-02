import { useEffect } from "react";
import { throttle } from "lodash";

export const useStretchingText = (textClassName, initialMinFontSize = 10) => {
  const stretchingText = () => {
    let fontSize;

    const textElements = document.querySelectorAll(`.${textClassName}`);
    if (textElements.length) {
      textElements.forEach((element) => {
        let maxCycles = 50;
        const boxElement = element.parentElement;
        let maxWidth = Math.floor(boxElement.clientWidth);
        let maxHeight = Math.floor(boxElement.clientHeight);
        fontSize = maxHeight;
        let minFontSize = initialMinFontSize;
        let maxFontSize = fontSize;

        element["style"].fontSize = `${fontSize}px`;

        while (fontSize !== minFontSize) {
          element["style"].fontSize = `${fontSize}px`;
          maxWidth = Math.floor(boxElement.clientWidth);
          maxHeight = Math.floor(boxElement.clientHeight);
          if (
            element.clientWidth <= maxWidth &&
            element.scrollHeight * 1.1 <= maxHeight
          ) {
            minFontSize = fontSize;
            if (
              (element.scrollHeight * 1.1) / maxHeight > 0.9 &&
              element.clientWidth / maxWidth > 0.9
            ) {
              break;
            }
          } else {
            maxFontSize = fontSize;
          }

          --maxCycles;

          fontSize = Math.floor((minFontSize + maxFontSize) / 2);

          if (minFontSize === maxFontSize || maxCycles <= 0) {
            break;
          }
        }
        element["style"].fontSize = `${minFontSize}px`;
        maxWidth = Math.floor(boxElement.clientWidth);
        maxHeight = Math.floor(boxElement.clientHeight);

        if (element.clientHeight > maxHeight || element.clientWidth > maxWidth)
          element["style"].overflow = `auto`;
      });
    }
    // }
  };

  const debouncedFunction = throttle(stretchingText, 1000);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      debouncedFunction();
    });

    const textElements = document.querySelectorAll(`.${textClassName}`);
    textElements.forEach((element) => {
      observer.observe(element, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    });
    window.addEventListener("resize", debouncedFunction);
    debouncedFunction();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", debouncedFunction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
