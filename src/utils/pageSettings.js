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
    newVal.filter = "";
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
  };

  let settingsSet = JSON.parse(localStorage.getItem("cards_settings"));
  if (!settingsSet) return defaultValue;
  return settingsSet;
};