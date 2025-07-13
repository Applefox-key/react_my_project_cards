import { useEffect, useRef } from "react";

export function useCardTimer(
  items,
  oneDelay,
  num,
  setNum,
  setFlip,
  setShowAnim
) {
  const timeouts = useRef([]);

  const clearAllTimeouts = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  };

  const start = () => {
    clearAllTimeouts();
    for (let i = num; i < items.length; i++) {
      const flipTimeout = setTimeout(
        () => setFlip(true),
        1100 * oneDelay * ((i - num) * 2 + 1)
      );

      const animTimeout =
        i + 1 < items.length
          ? setTimeout(() => {
              setShowAnim(i % 2 === 0);
              setFlip(false);
              setNum(i + 1);
            }, 1100 * oneDelay * ((i - num) * 2 + 2))
          : "";

      timeouts.current.push(flipTimeout, animTimeout);

      if (i + 1 === items.length) {
        const finishTimeout = setTimeout(() => {
          setNum(i + 1);
        }, 1100 * oneDelay * ((i - num) * 2 + 2));
        timeouts.current.push(finishTimeout);
      }
    }
  };

  useEffect(() => () => clearAllTimeouts(), []);

  return { start, clearAllTimeouts };
}
