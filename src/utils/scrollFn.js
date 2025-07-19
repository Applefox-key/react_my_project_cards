export const saveModeAndScroll = () => {
  // let hash = window.location.hash;
  localStorage.setItem("scrollY", window.scrollY);
  // if (hash) localStorage.setItem("pageMode", hash.replace("#", ""));
};
