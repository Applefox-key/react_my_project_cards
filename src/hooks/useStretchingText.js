import { useEffect } from "react";
import { throttle } from "lodash";

export const useStretchingText = (textClassName, initialMinFontSize = 10) => {
  const stretchingText = () => {
    let fontSize, maxHeight, maxWidth;

    const textElements = document.querySelectorAll(`.${textClassName}`);
    if (textElements.length) {
      textElements.forEach((element) => {
        let maxCycles = 100;
        const boxElement = element.parentElement;
        let maxWidth = Math.floor(
          boxElement.clientWidth
          // boxElement.offsetWidth
        );
        maxHeight = Math.floor(
          boxElement.clientHeight
          // boxElement.offsetWidth
        );
        // debugger;
        fontSize = maxHeight;
        let minFontSize = initialMinFontSize;
        let maxFontSize = fontSize;

        element["style"].fontSize = `${fontSize}px`;

        while (fontSize !== minFontSize) {
          element["style"].fontSize = `${fontSize}px`;
          maxWidth = Math.floor(boxElement.clientWidth);
          maxHeight = Math.floor(boxElement.clientHeight);
          if (
            element.clientHeight <= maxHeight &&
            element.clientWidth <= maxWidth
          ) {
            minFontSize = fontSize;
            if (
              maxHeight - element.clientHeight <= 80 &&
              maxWidth - element.clientWidth <= 15
            ) {
              break;
            }
          } else {
            maxFontSize = fontSize;
          }

          --maxCycles;
          // if (
          //   maxHeight - element.clientHeight <= 80 &&
          //   maxWidth - element.clientWidth <= 15 &&
          //   maxHeight - element.clientHeight >= 0 &&
          //   maxWidth - element.clientWidth >= 0 &&
          //   maxHeight > 0 &&
          //   maxWidth > 0
          // ) {
          //   break;
          // }
          fontSize = Math.floor((minFontSize + maxFontSize) / 2);

          //   fontSize = fontSize - 10;
          if (maxCycles <= 0) {
            console.error("The maximum cycle exceeded");
            break;
          }
        }
        element["style"].fontSize = `${minFontSize}px`;
      });
    }
    // }
  };

  const debouncedFunction = throttle(stretchingText, 15);

  useEffect(() => {
    window.addEventListener("resize", debouncedFunction);
    debouncedFunction();

    return () => {
      window.removeEventListener("resize", debouncedFunction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
