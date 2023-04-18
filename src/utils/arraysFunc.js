export const shuffle = (arr) => {
  arr.sort((a, b) => Math.random() - 0.5);
  return arr;
};

export const getFirstEl = (arr, count) => {
  if (arr.length > count) return arr.slice(0, count);
  return arr;
};
