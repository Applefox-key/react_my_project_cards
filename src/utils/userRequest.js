import BaseAPI from "../API/BaseAPI";
import { imgSrv } from "../API/apiConst";
import { defaultAvatar } from "../constants/defaultSettings";

export const userRequestData = (userData) => {
  let formData = new FormData();
  Object.keys(userData).forEach((key) => {
    if (key === "file") formData.append(key, userData[key]);
    if (key === "settings")
      formData.append(`data[${key}]`, JSON.stringify(userData[key]));
    else formData.append(`data[${key}]`, userData[key]);
  });
  return formData;
};

export const generateAvatarLink = (imgName) => {
  if (!imgName) return defaultAvatar;
  if (
    imgName.includes("static/media") ||
    imgName.includes("firebasestorage.googleapis")
  )
    return imgName;
  return imgName.includes("blob")
    ? imgName
    : imgSrv + "avatars/?img=" + imgName + "&token=" + BaseAPI.getToken();
};
