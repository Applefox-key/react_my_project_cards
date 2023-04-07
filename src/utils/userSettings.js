export const applyUserSettings = (set) => {
  if (set.hasOwnProperty("colorBack"))
    document.body.style.backgroundColor = set.colorBack;
};
