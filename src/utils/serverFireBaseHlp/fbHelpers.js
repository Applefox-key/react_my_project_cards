import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

export function firebaseInit() {
  const firebaseConfig = {
    storageBucket: "gs://words-d2019.appspot.com/",
  };
  initializeApp(firebaseConfig);
}

export async function getAvatarsFromStore() {
  firebaseInit();
  let imgarr = [];
  const storage = await getStorage();
  const listRef = await ref(storage, "avatars");

  try {
    let res = await listAll(listRef);
    res.prefixes.forEach((folderRef) => {});
    res.items.forEach((itemRef, i) => {
      getDownloadURL(itemRef).then((url) => {
        imgarr.push({ name: itemRef.name, url: url });
        if (imgarr.length === res.items.length) {
          localStorage.setItem("avatars", JSON.stringify(imgarr));
        }
      });
    });
    return imgarr;
  } catch (error) {}
}

export async function setImgToStorage(userKey, file) {
  firebaseInit();
  if (file) {
    const storage = await getStorage();
    const storageData = await ref(storage, "usersAvatars/" + userKey);
    let task = await uploadBytesResumable(storageData, file, {
      contentType: file.type,
    });
    if (task) {
      // console.log("Uploaded a blob or file!");
      let curl = await getDownloadURL(task.task.snapshot.ref);
      if (curl) return curl;
    }
  }
  return "";
}
