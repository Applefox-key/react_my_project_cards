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
export const applyUserSettings = (set) => {
  if (set.hasOwnProperty("colorBack"))
    document.body.style.backgroundColor = set.colorBack;
  document.documentElement.style.setProperty(
    "--contrast-text",
    getContrastColor(set.colorBack)
  );
};
