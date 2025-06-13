import { themeArr } from "../constants/defaultSettings";

export const collectionPageSettings = (
  commonSettings,
  field,
  val,
  isPublic
) => {
  let newVal = { ...commonSettings, [field]: val };
  if (field === "byCategory") {
    newVal[isPublic ? "selectedCategorypub" : "selectedCategorymy"] = "";
    newVal.filter = "";
  }
  if (field.includes("selectedCategory")) {
    newVal.byCategory = false;
    // newVal.filter = "";
    newVal.sideBar = "";
  }
  return newVal;
};

export const saveSet = (obj) => {
  let settingsSet = JSON.parse(localStorage.getItem("cards_settings"));

  if (settingsSet)
    localStorage.setItem(
      "cards_settings",
      JSON.stringify({ ...settingsSet, ...obj })
    );
  else localStorage.setItem("cards_settings", JSON.stringify(obj));
};

export const restoreSettings = (isPublic = false) => {
  const defaultValue = {
    selectedCategorymy: "",
    selectedCategorypub: "",
    filter: "",
    byCategory: false,
    shared: false,
    favorite: false,
    viewmode: 0,
    theme: "day",
  };

  let settingsSet = JSON.parse(localStorage.getItem("cards_settings"));
  if (!settingsSet) return defaultValue;
  return settingsSet;
};
export const getIsDaySettings = () => {
  let { theme } = restoreSettings();
  let res = theme && themeArr[theme] ? themeArr[theme].isday : true;
  return res;
};

export const saveOneSetting = (field, value) => {
  const oldValue = restoreSettings();
  const newValue = { ...oldValue, [field]: value };
  saveSet(newValue);
};
