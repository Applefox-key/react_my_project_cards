import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLastMode = (settings = null) => {
  const [mode, setMode] = useState(0);
  const router = useNavigate();

  const setNewMode = (vel) => {
    setMode(vel);
    router(window.location.pathname + "#" + vel, { replace: true });
  };

  const modeChange = () => {
    setNewMode(1 - mode);
  };
  useEffect(() => {
    if (window.location.hash === "")
      router(window.location.pathname + "#" + mode, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.hash]);

  useEffect(() => {
    if (setMode !== null) {
      const pageM = localStorage.getItem("pageMode");

      if (pageM) {
        setNewMode(parseInt(pageM));
        localStorage.removeItem("pageMode");
      } else {
        const userSet =
          settings && settings.settings
            ? settings.settings.listView
              ? 1
              : 0
            : 0;
        setNewMode(userSet);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [mode, modeChange];
};
