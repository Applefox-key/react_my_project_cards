import React, { useEffect, useState } from "react";
import "./tgb.scss";
import { changeTheme } from "../../../utils/userSettings";
import { restoreSettings } from "../../../utils/pageSettings";

const ThemeSwitch = ({ isPlay }) => {
  const [isCheckedDay, setIsCheckedDay] = useState(true);
  //   const [isPlay, setIsPlay] = useState(
  //     window.location.pathname.includes("/play_")
  //   );
  useEffect(() => {
    let { theme } = restoreSettings();
    if (theme !== "day") {
      setIsCheckedDay(false);
      changeTheme(false);
    }
  }, []);
  const handleChange = (e) => {
    e.stopPropagation();
    changeTheme(!isCheckedDay);
    setIsCheckedDay(!isCheckedDay);
  };

  return (
    <>
      <label className={isPlay ? "themeSwitch game" : "themeSwitch"}>
        <input
          type="checkbox"
          checked={isCheckedDay}
          onChange={(e) => handleChange(e)}
        />
        <span className="slider"></span>
      </label>
    </>
  );
};

export default ThemeSwitch;
