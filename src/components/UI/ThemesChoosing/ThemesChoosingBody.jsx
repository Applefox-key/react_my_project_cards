import React, { useEffect, useState } from "react";
import cl from "./ThemesChoosing.module.scss";
import { useOutsideClick } from "../../../hooks/useOutSideClick";
import { getCurrentTheme, setTheme } from "../../../utils/userSettings";
import { themeArr } from "../../../constants/defaultSettings";

const ThemesChoosingBody = ({ close, refw, callback }) => {
  const [colorTheme, setColorTheme] = useState("");

  const changeColor = (el) => {
    setColorTheme(el);

    setTheme(el);
  };
  useEffect(() => {
    setColorTheme(getCurrentTheme());
  }, []);

  useOutsideClick(refw, close);

  const gradient = (el) => {
    let gradientColors = [
      themeArr[el]["--main-back"],
      themeArr[el]["--background-nav"],
      themeArr[el]["--background-second"],
      themeArr[el]["--background-note"],
      themeArr[el]["--background-parts-answ"],
      themeArr[el]["--wrap-back"],
    ];

    // return `linear-gradient(90deg, ${gradientColors.join(", ")})`;
    return `linear-gradient(to bottom, ${gradientColors.join(", ")})`;
    // return `radial-gradient(circle at center, ${gradientColors.join(", ")})`;
  };

  return (
    <div className={cl["settings_bar"]}>
      {/* <h2>BACIS COLOR THEMES</h2> */}
      <div className={cl.radioWrap}>
        {Object.keys(themeArr).map((el) => (
          <div
            key={el}
            onClick={(e) => {
              e.stopPropagation();
              changeColor(el);

              callback(themeArr[el].isday);
            }}
            className={
              colorTheme === el
                ? [cl.planet, cl["planet-active"]].join(" ")
                : cl.planet
            }
            style={{
              background: gradient(el),
              borderColor: themeArr[el]["--color-marker"],
              color: themeArr[el]["--color-text-label"],
            }}>
            <span>{el}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemesChoosingBody;
