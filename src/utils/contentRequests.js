import BaseAPI from "../API/BaseAPI";
import { imgSrv } from "../API/apiConst";

export const contentRequestData = (content) => {
  let formData = new FormData();

  Object.keys(content).forEach((key) => {
    if (key === "imgAfile" || key === "imgQfile")
      formData.append(key, content[key] ? content[key] : "");
    else formData.append(`data[${key}]`, content[key] ? content[key] : "");
  });
  return formData;
};

const generateLink = (imgName, collectionID) => {
  if (!imgName) return "";
  return imgName.includes("blob")
    ? imgName
    : imgSrv +
        "?col=" +
        collectionID +
        "&img=" +
        imgName +
        "&token=" +
        BaseAPI.getToken();
};
export const getImgA = (contentItem) => {
  if (!contentItem.imgA) return "";
  return generateLink(contentItem.imgA, contentItem.collectionid);
};
export const getImgQ = (contentItem) => {
  if (!contentItem.imgQ) return "";
  return generateLink(contentItem.imgQ, contentItem.collectionid);
};
export const share = async (collection, setPopup) => {
  try {
    await BaseAPI.editColParam(
      { isPublic: !collection.isPublic },
      collection.id
    );
    setPopup.success(
      collection.isPublic
        ? "the collection has been unshared"
        : "the collection has been shared"
    );
  } catch (error) {
    setPopup.error(error);
  }
};
