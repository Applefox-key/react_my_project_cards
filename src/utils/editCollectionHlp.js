import BaseAPI from "../API/BaseAPI";

export const editCollectionHlp = async (
  name,
  note,
  categoryel,
  content,
  isNew,
  collection
) => {
  let newParam = {};
  if (name) newParam.name = name.trim();
  if (note) newParam.note = note;
  if (isNew) {
    if (categoryel.id) newParam.categoryid = categoryel.id;
    //new from file with content
    if (content) BaseAPI.CreateCollectionWithContent(newParam, content);
    //new without content
    else await BaseAPI.createCollection(newParam);
  } else {
    //edit collection's params
    if (categoryel.id !== collection.categoryid)
      newParam.categoryid = categoryel.id;
    await BaseAPI.editColParam(newParam, collection.id);
  }
};

export const getImportMenu = (cb) => {
  return [
    {
      name: "Add from the file",
      onClick: () => {
        cb("file");
      },
    },
    {
      name: "Add from the list",
      onClick: () => {
        cb("list");
      },
    },
  ];
};
