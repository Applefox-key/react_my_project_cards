import { useEffect } from "react";
import { throttle } from "lodash";

export const useStretchingText = (textClassName, initialMinFontSize = 10) => {
  const stretchingText = () => {
    let fontSize, maxHeight, maxWidth;

    const textElements = document.querySelectorAll(`.${textClassName}`);
    if (textElements.length) {
      textElements.forEach((element) => {
        let maxCycles = 50;
        const boxElement = element.parentElement;
        maxWidth = Math.max(
          boxElement.clientWidth * 0.9
          // boxElement.offsetWidth
        );
        maxHeight = Math.max(
          boxElement.clientHeight * 0.9
          // boxElement.offsetWidth
        );
        // debugger;
        fontSize = maxHeight;
        let minFontSize = initialMinFontSize;
        let maxFontSize = fontSize;

        element["style"].fontSize = `${fontSize}px`;

        while (fontSize !== minFontSize) {
          element["style"].fontSize = `${fontSize}px`;

          if (
            element.clientHeight <= maxHeight &&
            element.clientWidth <= maxWidth
          ) {
            minFontSize = fontSize;
          } else {
            maxFontSize = fontSize;
          }

          --maxCycles;

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
