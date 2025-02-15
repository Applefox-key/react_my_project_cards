import {
  defaultSettings,
  defaultStyleValue,
  nightTheme,
  dayTheme,
} from "../constants/defaultSettings";
import { restoreSettings, saveSet } from "./pageSettings";

const getContrastColor = (color) => {
  // to RGB
  const red = parseInt(color.substring(1, 3), 16);
  const green = parseInt(color.substring(3, 5), 16);
  const blue = parseInt(color.substring(5, 7), 16);
  // brightness by YIQ
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
  // if< 128, black, else white
  if (brightness < 128) {
    return "#fff";
  } else {
    return "#000";
  }
};
export const applyUserSettings = (set, prop = "") => {
  const { theme } = restoreSettings();
  const propName = theme !== "day" ? "colorBackN" : "colorBack";
  if (set.hasOwnProperty(propName) && (prop === "colorBack" || !prop)) {
    document.body.style.backgroundColor = set[propName];
    document.documentElement.style.setProperty("--color-back", set.colorBack);
    document.documentElement.style.setProperty(
      "--contrast-text",
      getContrastColor(set.colorBack)
    );
  }
  if (set.hasOwnProperty("wrapOpacity") && (prop === "wrapOpacity" || !prop)) {
    document.documentElement.style.setProperty(
      "--wrap-opacity",
      set.wrapOpacity / 100
    );
  }
};

export const updateStyles = (e, userData, setUserData) => {
  let nameS = e.target.id;
  if (nameS === "toDefault") {
    if (!window.confirm("turn back to the default settings?")) return;
    setUserData({ ...userData, settings: defaultSettings });
    applyUserSettings(defaultStyleValue);
    return;
  }
  let val = e.target.value;
  const newSet =
    typeof userData.settings === "object"
      ? {
          ...userData.settings,
          [nameS]: val,
        }
      : { [nameS]: val };
  setUserData({ ...userData, settings: newSet });
  applyUserSettings(newSet, nameS);
};

export const setVerticalCardFonrSize = (prop = "") => {
  if (prop) {
    document.documentElement.style.setProperty("--vertical-font", prop + "rem");
  }
};
export const setCardColor = (prop = "") => {
  if (prop) {
    document.documentElement.style.setProperty("--card-color", prop);
  }
};

export const changeTheme = (isCheckedDay) => {
  saveSet({ "theme": isCheckedDay ? "day" : "night" });
  let colors = isCheckedDay ? { ...dayTheme } : { ...nightTheme };
  document.body.style.backgroundColor = colors["--color-back"];
  for (let key in colors) {
    document.documentElement.style.setProperty(key, colors[key]);
  }
};
