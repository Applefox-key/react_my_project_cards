import * as fbHelpers from "../utils/serverFireBaseHlp/fbHelpers";
import axios from "axios";
import { SERVER_URL } from "./apiConst";
import { contentRequestData } from "../utils/contentRequests";
import { defaultSettings } from "../constants/defaultSettings";
import { userRequestData } from "../utils/userRequest";

const BaseAPI = {
  async getAuthHeaders() {
    let token = JSON.parse(localStorage.getItem("tokencards"));
    if (!token) throw new Error("session not found");
    return {
      "Authorization": `Bearer ${token}`,
    };
  },
  getToken() {
    let token = JSON.parse(localStorage.getItem("tokencards"));
    if (!token) throw new Error("session not found");
    return token;
  },
  async serverReq(
    method,
    url,
    isHeader,
    data = "",
    params = "",
    formData = ""
  ) {
    let axiosConfig = {
      method: method,
      url: SERVER_URL + url,
    };
    if (params) axiosConfig.params = params;

    if (formData) {
      axiosConfig.data = formData;

      // axiosConfig.data = { "sss": { bbbbb: "sdsdsdad" } };
      // if (data) axiosConfig.data.data = data;
    } else if (data) axiosConfig.data = { data: data };
    // if (data.imgAfile) axiosConfig.data.imgAfiles = data.imgAfile;
    // if (data.imgQfile) axiosConfig.data.imgAfiles = data.imgQfile;

    if (isHeader) axiosConfig.headers = await this.getAuthHeaders();

    try {
      let result = await axios(axiosConfig);
      if ((method = "get")) return result.data;
      return { status: true, message: "success" };
    } catch (error) {
      if (error.code === "ERR_NETWORK") return { error: error.message };
      return { error: error.response.data.error };
    }
  },
  async getImg(imgS, token = "") {
    let axiosConfig = {
      method: "get",
      url: SERVER_URL + "/" + imgS.replace(/\\/g, "/"),
      responseType: "blob",
    };
    axiosConfig.headers = token
      ? `"Authorization": Bearer ${token}`
      : await this.getAuthHeaders();
    try {
      let result = await axios(axiosConfig);
      const blob = new Blob([result.data], {
        type: result.headers["content-type"],
        // type: result.getResponseHeader("Content-Type"),
      });
      const url = URL.createObjectURL(blob);

      return url;
    } catch (error) {
      if (error.code === "ERR_NETWORK") return { error: error.message };
      return { error: error.response.data.error };
    }
  },
  async createCategory(name, isPublic = false) {
    let reqData = {
      name: name,
    };
    return await this.serverReq("post", "/categories/user", true, reqData);
  },
  async createCollection(set) {
    let reqData = {
      name: set.name,
    };
    if (set.note) reqData.note = set.note;
    // if (set.category.id) reqData.categoryid = set.category.id;
    if (set.categoryid) reqData.categoryid = set.categoryid;
    return await this.serverReq("post", "/collections", true, reqData);
  },
  async CreateCollectionWithContent(collectionFrom, content, fromPub = false) {
    let reqData = {
      name: collectionFrom.name,
      note: collectionFrom.note,
      content: content,
      colId: collectionFrom.id,
      fromPub: fromPub,
    };
    if (fromPub) reqData.categoryName = collectionFrom.category;
    else reqData.categoryid = collectionFrom.categoryid;
    return await this.serverReq("post", "/collections/content", true, reqData);
  },
  async copySharedCollection(collectionFrom) {
    let reqData = {
      colId: collectionFrom.id,
    };

    return await this.serverReq("post", "/collections/copy", true, reqData);
  },
  async createContentFromArray(arr, colId) {
    arr.forEach((element, i) => {
      if (!element.question || !element.answer)
        return { error: "you cannot add an empty value ....row " + (i + 1) };
      // throw new Error("you cannot add an empty value ....row " + (i + 1));
    });
    let reqData = { list: arr };

    return await this.serverReq(
      "post",
      "/collections/" + colId + "/content",
      true,
      reqData
    );
  },
  async createContent(content, colId) {
    if (
      !content.id ||
      (!content.answer && !content.imgA) ||
      (!content.question && !content.imgQ)
    )
      throw new Error("please specify the answer and the question");

    let formData = contentRequestData(content);

    // return await this.serverReq("patch", "/content", true, "", "", formData);

    // let reqData = {
    //   question: content.question,
    //   answer: content.answer,
    //   note: content.note,
    //   imgA: content.imgA ? content.imgA : "",
    //   imgQ: content.imgQ ? content.imgQ : "",
    // };
    return await this.serverReq(
      "post",
      "/collections/" + colId + "/content",
      true,
      "",
      "",
      formData
    );
    // let list = await BaseAPI.fromLS("extraList");
    // let wId = Date.now();
    // list.push({
    //   id: wId,
    //   collectionid: colId,
    //   question: content.question,
    //   answer: content.answer,
    //   note: content.note,
    // });
    // await BaseAPI.toLS("extraList", list);
    // return wId;
  },

  // async createPublicCollection(note, name, category, content) {
  //   let reqData = {
  //     name: name,
  //     note: note,
  //     category: category,
  //     content: content,
  //   };
  //   return await this.serverReq("post", "/pbcollections", true, reqData);
  // },
  async createUser(ud) {
    let reqData = {
      email: ud.email,
      password: ud.password,
      name: ud.name,
      img: ud.img,
      settings: defaultSettings,
    };
    if ((reqData.img = ""))
      reqData.img = "/static/media/profile.dd82cd98f5e2825724fb.ico";
    return await this.serverReq("post", "/users", false, reqData);
  },
  async deleteCategory(catid) {
    return await this.serverReq("delete", "/categories/" + catid, true);
  },
  async deleteCategoriesAll() {
    return await this.serverReq("delete", "/categories", true);
  },
  async deleteColContent(colId) {
    return await this.serverReq(
      "delete",
      "/collections/" + colId + "/content",
      true
    );
  },
  async deleteColection(colId) {
    if (colId === "new") return;
    return await this.serverReq("delete", "/collections/" + colId, true);

    // let collectionList = await BaseAPI.fromLS("collectionsList");

    // let num = collectionList.findIndex(
    //   (item) => item.id.toString() === colId.toString()
    // );
    // this.deleteColContent(colId);
    // collectionList.splice(num, 1);
    // await BaseAPI.toLS("collectionsList", collectionList);
  },
  async deleteColectionAll() {
    return await this.serverReq("delete", "/collections", true);
  },
  async deleteContent(wId) {
    return await this.serverReq("delete", "/content/" + wId, true);
    // let list = await BaseAPI.fromLS("extraList");
    // let indbase = list.findIndex(
    //   (item) => item.id.toString() === wId.toString()
    // );
    // if (indbase !== -1) list.splice(indbase, 1);
    // await BaseAPI.toLS("extraList", list);
  },
  // async deletePbColection(colId) {
  //   return await this.serverReq("delete", "/pbcollections/" + colId, true);
  // },
  // async deleteUserPbColectionAll() {
  //   return await this.serverReq("delete", "/pbcollections/user", true);
  // },
  async editCategory(newParam, catId) {
    if (!newParam || !catId) return { message: "nothing has changed" };

    return await this.serverReq(
      "patch",
      "/categories/" + catId,
      true,
      newParam
    );

    // let collectionList = await this.getCollectionsList();
    // let num = collectionList.findIndex(
    //   (item) => item.id.toString() === colId.toString()
    // );
    // collectionList[num] = { ...collectionList[num], name: newName };
    // await BaseAPI.toLS("collectionsList", collectionList);
  },
  async editColParam(newParam, colId) {
    if (!newParam || !colId) return { message: "nothing has changed" };
    return await this.serverReq(
      "patch",
      "/collections/" + colId,
      true,
      newParam
    );

    // let collectionList = await this.getCollectionsList();
    // let num = collectionList.findIndex(
    //   (item) => item.id.toString() === colId.toString()
    // );
    // collectionList[num] = { ...collectionList[num], name: newName };
    // await BaseAPI.toLS("collectionsList", collectionList);
  },
  async editContent(newV) {
    if (
      !newV.id ||
      (!newV.answer && !newV.imgA) ||
      (!newV.question && !newV.imgQ)
    )
      throw new Error("please specify the answer and the question");

    let formData = contentRequestData(newV);

    return await this.serverReq("patch", "/content", true, "", "", formData);
  },
  async getCategoriesList(isPublic = false) {
    const result = isPublic
      ? await this.serverReq("get", "/categories/public", true)
      : await this.serverReq("get", "/categories/user", true);

    if (result.error) {
      throw new Error(result.error);
    }
    return result.data;
  },
  async getCategoryCollections(catId) {
    const result = await this.serverReq(
      "get",
      `/categories/${catId}/collections`,
      true
    );

    if (result.error) {
      throw new Error(result.error);
    }

    return result.data;
  },
  async getCollectionsAndContent(
    colId = "",
    categoryid = "",
    textFilter = "",
    isPublic = ""
  ) {
    let reqParams = {};
    if (categoryid) reqParams.categoryid = categoryid;
    if (textFilter) reqParams.textFilter = textFilter;
    if (isPublic !== "") reqParams.isPublic = isPublic ? 1 : 0;

    let result = colId
      ? await this.serverReq("get", "/collections/" + colId + "/content", true)
      : await this.serverReq(
          "get",
          "/content",
          true,
          "",
          reqParams === {} ? "" : reqParams
        );
    if (result.error) throw new Error(result.error);

    return result.data;
  },
  async getCollectionsList(colId) {
    let result = colId
      ? await this.serverReq("get", "/collections/" + colId, true)
      : await this.serverReq("get", "/collections", true);

    if (result.error) throw new Error(result.error);
    return result.data;
  },
  async getContent(colId) {
    let result = await this.serverReq(
      "get",
      "/collections/" + colId + "/content",
      true
    );
    if (result.error) throw new Error(result.error);
    return result.data[0].content;
  },
  async getContentItem(id) {
    let result = await this.serverReq("get", "/content/" + id, true);
    if (result.error) throw new Error(result.error);

    return result.data;
  },
  //pbcollection's list/ or one by id
  async getPublicCollections(colId) {
    let result = colId
      ? await this.serverReq("get", "/pbcollections/" + colId, true)
      : await this.serverReq("get", "/pbcollections", true);
    if (result.error) throw new Error({ error: result.error });
    return result.data;
  },
  // //pbcollection's list shared by user
  // async getPublicCollectionsUser() {
  //   let result = await this.serverReq("get", "/pbcollections/user", true);
  //   if (result.error) throw new Error(result.error);
  //   return result.data;
  // },
  //pbcollection with content
  async getPublicCollectionsAndContent(colId) {
    let result = colId
      ? await this.serverReq(
          "get",
          "/pbcollections/" + colId + "/content",
          true
        )
      : await this.serverReq("get", "/pbcollections/content", true);
    if (result.error) throw new Error(result.error);
    return result.data;
  },
  async getPublicContent(colId) {
    let result = await this.serverReq(
      "get",
      "/pbcollections/" + colId + "/content",
      true
    );
    if (result.error) throw new Error(result.error);
    return result.data[0].content;
  },
  async getPublicContentItem(id) {
    let result = await this.serverReq("get", "/content/pub/" + id, true);

    if (result.error) throw new Error(result.error);
    return result.data;
  },
  async getUser() {
    let result = await this.serverReq("get", "/users", true);
    if (result.error) throw new Error(result.error);
    // let sss =
    //   result.data.settings === "null" ? defaultSettings : result.data.settings;

    let usrData = {
      ...result.data,
      password: "",
      // settings: sss,
      settings: result.data.settings
        ? JSON.parse(result.data.settings)
        : defaultSettings,
    };
    return usrData;
  },
  async login(login, passw) {
    let reqData = {
      email: login,
      password: passw.toString(),
    };
    let result = await this.serverReq("post", "/users/login", false, reqData);
    if (result.error) throw new Error(result.error);

    let token = result.token;
    localStorage.setItem("Auth", "true");
    localStorage.setItem("tokencards", JSON.stringify(token));
    return { status: true, role: result.role };
  },
  async logout() {
    let result = await this.serverReq("delete", "/users/logout", true);
    if (!result.error) {
      localStorage.setItem("Auth", "false");
      localStorage.removeItem("tokencards");
    }
    return result;
  },
  async updateUser(ud) {
    let reqData = { ...ud };
    if (ud.img.includes("blob")) {
      let img = await fbHelpers.setImgToStorage(ud.id, ud.file);
      reqData = { ...ud, img: img };
    }
    let formData = userRequestData(ud);
    // return await this.serverReq(
    //   "post",
    //   "/collections/" + colId + "/content",
    //   true,
    //   "",
    //   "",
    //   formData
    // );
    return await this.serverReq("patch", "/users", true, reqData, "", formData);
  },
  async sendMailResetToken(login) {
    let reqData = {
      email: login,
      page: "card",
    };
    let result = await this.serverReq("post", "/resetpassword", false, reqData);
    if (result.error) throw new Error(result.error);
    return { status: true };
  },
  async CheckResetToken(resetToken) {
    let reqParams = { resetToken: resetToken };

    let result = await this.serverReq(
      "get",
      "/resetpassword",
      false,
      "",
      reqParams
    );
    if (result.error) throw new Error(result.error);
    return { status: true };
  },
  async setNewPassword(password, resetToken) {
    let reqData = { password: password, resetToken: resetToken };
    let result = await this.serverReq(
      "patch",
      "/resetpassword",
      false,
      reqData
    );

    if (result.error) throw new Error(result.error);
    return { status: true };
  },
  getAvatarUrl(num) {
    const avlist = JSON.parse(localStorage.getItem("avatars"));
    if (num > avlist.length()) return "";
    return avlist[num];
  },
  getAvatarUrlList(num) {
    const avlist = JSON.parse(localStorage.getItem("avatars"));

    return avlist;
  },
  createDB() {
    if (!localStorage.getItem("avatars")) {
      const avList = fbHelpers.getAvatarsFromStore();

      avList.then(localStorage.setItem("avatars", JSON.stringify(avList)));
    }
  },
};
export default BaseAPI;
