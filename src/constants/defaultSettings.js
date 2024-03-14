import imgProfile from "../img/profile.ico";

export const nightTheme = {
  "--color-back": "black",
  "--contrast-text": "white",
  "--wrap-opacity": "0",
  "--background-wrap": "#1d1b1b",
  "--background-header": "#252c2f",
  "--background-first": "#1d2225",
  "--background-second": "#252c2f",
  "--background-third": "#053c29",
  // "--background-third": "#0f9393b3",

  "--color-bg-wrap": "#86909b",
  "--background-nav": "#011e16",
  "--color-nav": "#0f9393b3",
  "--color-text": "#b5a68a",
  "--background-wrap-rgb": "rgb(29, 27, 27, 0)",
  "--color-checked": "#0f9393b3",
  "--background-note": "#1f4f5c",
  "--border-note": "#0f9393b3",
  "--background-intense": "grey",
  "--color-intense": "#0ca673",
  "--background-even": "#1e282e",
  "-color-about": "#147170;",
  "--background-parts-answ": "#0f9393b3",
};
//"--color-checked": "#b1838e", "--border-note": "#0f9393b3",  "--background-note": "#152a0a",
// "--color--text": "#b5a68a", "--background-even": "#3c4c56",
//===============
//   --card-color: #fffff0;
//   --color--text: black;
//   --color-back: white;
//   --color-bg-wrap: #5f6368; // #343A40;
//   // --color-bg-wrap: #5f6368;

//   // color: #5f6368;
//   --contrast-text: black;
//   --wrap-opacity: 1;

//   --background-wrap-rgb: 248, 248, 255;
//   --background-wrap: #ffffff;
//   --background-nav: #193B70;
//   --color-nav: #193B70;
//   // --background-header: #6da4cb;
//   --background-header: #f7f6f6;
//   --background-first: #fcfbf7;
//   // color: var(--color-bg-wrap);
//   --background-second: #ededed;
//   --background-even: rgb(247, 246, 246);
//   --background-third: #add8e6;
//   --background-switch: #313236;
//   --background-intense: #0A58CA;
//   --color-intense: #4461F2;
//   --background-note: #ed666d;
//   --border-note: red;
//   --color-checked: #FF4500;
export const dayTheme = {
  "--color-back": "white",
  "--contrast-text": "black",
  "--background-wrap": "#ffffff",
  "--background-header": "#f7f6f6",
  "--background-first": "#fcfbf7",
  "--background-second": "#ededed",
  "--background-third": "#337AB7",
  "--color-bg-wrap": "#5f6368",
  "--background-nav": "#193B70",
  "--color-nav": "#193B70",
  "--color-text": "black",
  "--background-wrap-rgb": "rgb(247, 246, 246)",
  "--color-checked": "#FF4500",
  "--background-note": "#ed666d",
  "--border-note": "red",
  "--background-intense": "#0A58CA",
  "--color-intense": "#4461F2",
  "--background-even": "#F7F6F6",
  "-color-about": "#5d8fd0",
  "--background-parts-answ": "blanchedalmond",
};
export const defaultColorBack = "white";
export const defaultStyleValue = {
  colorBack: dayTheme["--color-back"],
  colorBackN: nightTheme["--color-back"],
  wrapOpacity: 100,
};
export const defaultSettings = { colorBack: defaultColorBack };
export const defaultAvatar = imgProfile;
export const DEFAUL_USER_DATA = {
  name: "",
  email: "",
  img: defaultAvatar,
  password: "",
  settings: defaultSettings,
};
