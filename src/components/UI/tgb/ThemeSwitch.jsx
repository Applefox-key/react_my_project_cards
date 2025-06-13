import React, { useEffect, useState } from "react";
import "./tgb.scss";
import { changeTheme } from "../../../utils/userSettings";
import { getIsDaySettings } from "../../../utils/pageSettings";
import ThemesChoosing from "../ThemesChoosing/ThemesChoosing";

const ThemeSwitch = ({ isPlay }) => {
  const [isCheckedDay, setIsCheckedDay] = useState(true);
  useEffect(() => {
    let isday = getIsDaySettings();
    if (!isday) {
      setIsCheckedDay(false);
      changeTheme(false);
    }
  }, []);
  const handleChange = (e) => {
    e.stopPropagation();

    changeTheme(!isCheckedDay);
    setIsCheckedDay(!isCheckedDay);
  };

  const themeChange = (isDay) => {
    // changeTheme(isDay);
    setIsCheckedDay(isDay);
  };
  return (
    <>
      <label className={isPlay ? "themeSwitch game" : "themeSwitch"}>
        <input
          type="checkbox"
          checked={isCheckedDay}
          onChange={(e) => {
            e.stopPropagation();
            handleChange(e);
          }}
        />
        <span className="slider"></span>
      </label>{" "}
      <ThemesChoosing callback={themeChange} />
    </>
  );
};

export default ThemeSwitch;
