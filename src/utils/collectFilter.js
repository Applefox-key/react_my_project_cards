export const getFiltredCollections = (collectionsList, filter) => {
  if (!filter.trim()) return collectionsList;
  if (collectionsList[0].collection) {
    //list format - collections and content
    return collectionsList.filter((item) => {
      if (item.collection.name.toLowerCase().includes(filter.toLowerCase()))
        return true;
      else
        return item.content.some(
          (elem) =>
            elem.question.toLowerCase().includes(filter.toLowerCase()) ||
            elem.answer.toLowerCase().includes(filter.toLowerCase()) ||
            elem.note.toLowerCase().includes(filter.toLowerCase())
        );
    });
  }
  //list format - collections array
  return collectionsList.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );
};

export const filterByCategory = (list, category) => {
  if (category)
    return list.filter(
      (item) =>
        category.id ===
        (list[0].collection ? item.collection.categoryid : item.categoryid)
    );
  return list;
};
