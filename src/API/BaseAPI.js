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
    } else if (data) axiosConfig.data = { data: data };

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
    if (set.categoryid) reqData.categoryid = set.categoryid;
    return await this.serverReq("post", "/collections", true, reqData);
  },
  async createPlaylist(set) {
    let reqData = {
      ...set,
    };
    return await this.serverReq("post", "/playlists", true, reqData);
  },
  async CreateCollectionWithContent(collectionFrom, content, fromPub = false) {
    let reqData = {
      name: collectionFrom.name,
      note: collectionFrom.note,
      content: content,
      colId: collectionFrom.id,
      categoryid: collectionFrom.categoryid,
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
    return await this.serverReq(
      "post",
      "/collections/" + colId + "/content",
      true,
      "",
      "",
      formData
    );
  },

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
  },
  async deleteColectionAll() {
    return await this.serverReq("delete", "/collections", true);
  },
  async deleteContent(wId) {
    return await this.serverReq("delete", "/content/" + wId, true);
  },
  async deletePlaylist(id) {
    if (id === "new") return;
    return await this.serverReq("delete", "/playlists/" + id, true);
  },
  async editCategory(newParam, catId) {
    if (!newParam || !catId) return { message: "nothing has changed" };

    return await this.serverReq(
      "patch",
      "/categories/" + catId,
      true,
      newParam
    );
  },
  async editColParam(newParam, colId) {
    if (!newParam || !colId) return { message: "nothing has changed" };
    return await this.serverReq(
      "patch",
      "/collections/" + colId,
      true,
      newParam
    );
  },
  async switchIsPublic(newParam, colId) {
    if (!newParam || !colId) return { message: "nothing has changed" };
    return await this.serverReq(
      "patch",
      "/collections/share/" + colId,
      true,
      newParam
    );
  },
  async editPlaylist(newParam, id) {
    if (!newParam || !id) return { message: "nothing has changed" };
    return await this.serverReq("patch", "/playlists/" + id, true, newParam);
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
  async getCategoriesListWithCollections(isPublic = false) {
    const result = isPublic
      ? await this.serverReq("get", "/categories/public/collections", true)
      : await this.serverReq("get", "/categories/user/collections", true);

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
    isPublic = "",
    isFavorite = ""
  ) {
    if (isFavorite) {
      let result = await this.serverReq(
        "get",
        "/collections/favorite",
        true,
        "",
        isPublic ? { isPublic: 1 } : ""
      );
      if (result.error) throw new Error(result.error);

      return result.data;
    } else {
      let reqParams = {};
      if (categoryid) reqParams.categoryid = categoryid;
      if (textFilter) reqParams.textFilter = textFilter;
      if (isPublic !== "") reqParams.isPublic = isPublic ? 1 : 0;

      let result = colId
        ? await this.serverReq(
            "get",
            "/collections/" + colId + "/content",
            true
          )
        : await this.serverReq(
            "get",
            "/content",
            true,
            "",
            reqParams === {} ? "" : reqParams
          );
      if (result.error) throw new Error(result.error);

      return result.data;
    }
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
  async getContentPlaylist(id) {
    let result = await this.serverReq(
      "get",
      "/playlists/" + id + "/content",
      true
    );

    if (result.error) throw new Error(result.error);
    return result.data;
  },
  async getContentItem(id) {
    let result = await this.serverReq("get", "/content/" + id, true);
    if (result.error) throw new Error(result.error);

    return result.data;
  },
  async getPlaylists(id = "") {
    let result = id
      ? await this.serverReq("get", "/playlists/" + id, true)
      : await this.serverReq("get", "/playlists/", true);
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
  }, //pbcollection's list/ or one by id
  async getPublicCollectionsWithCount() {
    let result = await this.serverReq("get", "/pbcollections/count", true);
    if (result.error) throw new Error({ error: result.error });
    return result.data;
  },
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
