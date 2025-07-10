import { useEffect, useState } from "react";

export function useElementInDOM(id) {
  const [isPresent, setIsPresent] = useState(false);

  useEffect(() => {
    const checkElement = () => {
      const el = document.getElementById(id);
      setIsPresent(!!el);
    };

    checkElement();

    const observer = new MutationObserver(checkElement);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [id]);

  return isPresent;
}
