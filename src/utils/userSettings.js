import { themeArr } from "../constants/defaultSettings";
import { restoreSettings, saveOneSetting, saveSet } from "./pageSettings";

export const getCurrentTheme = () => {
  // const theme = getSettings("themec", "sky");
  const { theme } = restoreSettings();
  return theme;
};

export const setTheme = (theme = "", usersTheme = "") => {
  //if user choose the theme - save his choise to the local storage
  if (theme) saveOneSetting("theme", theme);
  //if user doesn't choose the theme try get it from the local storage or set default value
  let localTheme = theme ? theme : getCurrentTheme();
  if (localTheme === "day" && !theme) return;
  if (localTheme) {
    const colors = themeArr.hasOwnProperty(localTheme)
      ? themeArr[localTheme]
      : usersTheme[localTheme];
    for (let key in colors) {
      if (key !== "isday")
        document.documentElement.style.setProperty(key, colors[key]);
    }
  }
};

export const applyUserSettings = (set, prop = "") => {
  setTheme();
};

export const setVerticalCardFonrSize = (prop = "") => {
  if (prop) {
    document.documentElement.style.setProperty("--vertical-font", prop + "rem");
  }
};
export const setCardColor = (prop = "") => {
  if (prop) {
    document.documentElement.style.setProperty("--card-color-print", prop);
  }
};

export const changeTheme = (isCheckedDay) => {
  saveSet({ "theme": isCheckedDay ? "day" : "night" });
  let colors = isCheckedDay ? { ...themeArr["day"] } : { ...themeArr["night"] };
  document.body.style.backgroundColor = colors["--main-back"];
  for (let key in colors) {
    document.documentElement.style.setProperty(key, colors[key]);
  }
};

export const getuserDef = (pageParam = null) => {
  let hisUser;
  if (
    pageParam !== null &&
    Object.keys(pageParam).length !== 0 &&
    pageParam.email
  )
    hisUser = pageParam.email;
  else hisUser = JSON.parse(localStorage.getItem("usercards"));
  return hisUser ? hisUser : { login: "JohnDoe@test.test", pass: "JohnDoe" };
};

export const setUserDef = (userEmail) => {
  if (userEmail) localStorage.removeItem("usercards");
  let newUser = JSON.stringify({ login: userEmail, pass: "" });
  localStorage.setItem("usercards", newUser);
};
