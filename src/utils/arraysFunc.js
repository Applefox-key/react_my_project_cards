export const shuffle = (arr) => {
  if (!arr.length) return arr;
  arr.sort((a, b) => Math.random() - 0.5);
  return arr;
};

export const getFirstEl = (arr, count) => {
  if (arr.length > count) return arr.slice(0, count);
  return arr;
};
// sorting an array of objects by field
export const sortByField = (content, field, descending = false) => {
  const compareFn = (a, b) => {
    const valueA = a[field].toLowerCase().trimLeft();
    const valueB = b[field].toLowerCase().trimLeft();

    if (valueA < valueB) {
      return descending ? 1 : -1;
    }
    if (valueA > valueB) {
      return descending ? -1 : 1;
    }
    return 0;
  };

  return content.slice().sort(compareFn);
};
// sorting an array of collections by field
export const sortByFieldC = (content, field, descending = false) => {
  const compareFn = (a, b) => {
    const valueA =
      a.collection[field] === null
        ? ""
        : a.collection[field].toLowerCase().trimLeft();
    const valueB =
      b.collection[field] === null
        ? ""
        : b.collection[field].toLowerCase().trimLeft();

    if (valueA < valueB) {
      return descending ? 1 : -1;
    }
    if (valueA > valueB) {
      return descending ? -1 : 1;
    }
    return 0;
  };
  return content.slice().sort(compareFn);
};
// sorting an array of categories and collections
export const sortByFieldCat = (content) => {
  content.sort((a, b) => a.name.localeCompare(b.name));
  content.forEach((obj) => {
    obj.collections.sort((a, b) => a.name.localeCompare(b.name));
  });
  return content;
};
//checking if Object with field id === value in the array
export const isObjInArray = (arr, attr, value) => {
  return arr.some((obj) => obj[attr] === value);
};
// check is object in Array if not -> add if it is - delete
