export const shuffle = (arr) => {
  arr.sort((a, b) => Math.random() - 0.5);
  return arr;
};

// export const delId = (arr, id) => {
//   let ind = arr.findIndex((item) => item.id.toString() === id.toString());
//   arr.splice(ind, 1);
//   return arr;
// };
