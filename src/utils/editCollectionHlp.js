import BaseAPI from "../API/BaseAPI";

export const editCollectionHlp = async (colllectionData) => {
  const { newName, newNote, category, content, isNew, collection } =
    colllectionData;
  let res = "";
  let newParam = {
    ...(isNew && {
      name: newName?.trim() || "",
      note: newNote || "",
      categoryid: category?.id || null,
    }),
    ...(!isNew &&
      collection && {
        ...(newName !== collection.name && { name: newName.trim() }),
        ...(newNote !== collection.note && { note: newNote }),
        ...(category?.id !== collection.categoryid && {
          categoryid: category?.id || null,
        }),
      }),
  };

  if (isNew) {
    res = content
      ? await BaseAPI.CreateCollectionWithContent(newParam, content)
      : await BaseAPI.createCollection(newParam);
  } else if (collection) {
    await BaseAPI.editColParam(newParam, collection.id);
  }
  if (!res.error && res.hasOwnProperty("id")) return res.id.id;
};

export const editPlaylistHlp = async (name, listIds, playlistid) => {
  let res = "";
  let newParam = {
    ...(name && { name: name.trim() }),
    listIds: (listIds.length && listIds.join(",").trim()) || "",
  };

  res =
    playlistid === "new"
      ? await BaseAPI.createPlaylist(newParam) //new
      : await BaseAPI.editPlaylist(newParam, playlistid); //edit collection's params

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

export const transferContent = async (contentsIds, collectionId = null) => {
  let newID = collectionId;
  if (newID === null) {
    let userInput = prompt("please write the name of new collection", "");
    if (userInput) {
      const collectionData = {
        newName: userInput,
        isNew: true,
      };
      newID = await editCollectionHlp(collectionData);
      if (newID.error) {
        return newID;
      }
    } else
      return {
        error:
          "you need to choose a collection or write a new collections name",
      };
  }
  let res = (newID = await BaseAPI.transferContentBetweenColections(
    contentsIds,
    newID
  ));
  return res;
  //already have the newID
};
