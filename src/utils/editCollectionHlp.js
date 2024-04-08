import BaseAPI from "../API/BaseAPI";

export const editCollectionHlp = async (
  name,
  note,
  categoryel,
  content,
  isNew,
  collection
) => {
  let res = "";
  let newParam = {};
  if (name) newParam.name = name.trim();
  if (note) newParam.note = note;
  if (isNew) {
    if (categoryel.id) newParam.categoryid = categoryel.id;
    //new from file with content
    if (content)
      res = await BaseAPI.CreateCollectionWithContent(newParam, content);
    //new without content
    else res = await BaseAPI.createCollection(newParam);
  } else {
    //edit collection's params
    if (categoryel.id !== collection.categoryid)
      newParam.categoryid = categoryel.id ? categoryel.id : null;
    await BaseAPI.editColParam(newParam, collection.id);
  }

  if (!res.error && res.hasOwnProperty("id")) return res.id.id;
};

export const editPlaylistHlp = async (name, listIds, playlistid) => {
  let res = "";
  let newParam = {};

  newParam.listIds = listIds.length ? listIds.join(",").trim() : "";
  if (name) newParam.name = name.trim();

  //new
  if (playlistid === "new") {
    res = await BaseAPI.createPlaylist(newParam);
  } else {
    //edit collection's params
    await BaseAPI.editPlaylist(newParam, playlistid);
  }

  if (!res.error && res.hasOwnProperty("id")) return res.id.id;
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
