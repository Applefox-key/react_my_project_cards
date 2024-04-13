import { useEffect } from "react";
import { throttle } from "lodash";

export const useStretchingText = (textClassName, initialMinFontSize = 10) => {
  const stretchingText = () => {
    let fontSize;

    const textElements = document.querySelectorAll(`.${textClassName}`);
    if (textElements.length) {
      textElements.forEach((element) => {
        let maxCycles = 100;
        const boxElement = element.parentElement;
        let maxWidth = Math.floor(boxElement.clientWidth);
        let maxHeight = Math.floor(boxElement.clientHeight);
        // debugger;
        fontSize = maxHeight;
        let minFontSize = initialMinFontSize;
        let maxFontSize = fontSize;

        element["style"].fontSize = `${fontSize}px`;
        console.log(element.innerText);

        while (fontSize !== minFontSize) {
          element["style"].fontSize = `${fontSize}px`;
          maxWidth = Math.floor(boxElement.clientWidth);
          maxHeight = Math.floor(boxElement.clientHeight);

          // console.log({
          //   maxCycles: 101 - maxCycles,
          //   fontSize,
          //   scrollHeight: element.scrollHeight,
          //   maxHeight,
          //   maxWidth,
          //   eW: element.clientWidth,
          //   eH: element.clientHeight,
          //   isS: element.scrollHeight > maxHeight,
          //   minFontSize,
          // });

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
          // console.log({ fontSize, minFontSize, maxFontSize });

          if (minFontSize === maxFontSize) {
            break;
          }
          if (maxCycles <= 0) {
            // console.error("The maximum cycle exceeded");
            break;
          }
        }
        element["style"].fontSize = `${minFontSize}px`;
        maxWidth = Math.floor(boxElement.clientWidth);
        maxHeight = Math.floor(boxElement.clientHeight);

        if (element.clientHeight > maxHeight || element.clientWidth > maxWidth)
          element["style"].overflow = `visible`;
      });
    }
    // }
  };

  const debouncedFunction = throttle(stretchingText, 1000);

  useEffect(() => {
    window.addEventListener("resize", debouncedFunction);
    debouncedFunction();

    return () => {
      window.removeEventListener("resize", debouncedFunction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
