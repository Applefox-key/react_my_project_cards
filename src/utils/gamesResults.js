import BaseAPI from "../API/BaseAPI";

export const saveTempResults = (el, game, mode) => {
  let isitem = el.hasOwnProperty("item");
  let id = parseInt(isitem ? el.item.id : el.id);
  let tempResults = JSON.parse(localStorage.getItem(game));
  if (tempResults === null) tempResults = {};
  tempResults[id] = { [game + mode]: el.probability }; // Adding a new element if the id does not exist or update value
  localStorage.setItem(game, JSON.stringify(tempResults)); //Saving the updated array in the local storage
};

export const saveResults = (game) => {
  let tempResults = JSON.parse(localStorage.getItem(game));
  if (!tempResults) return;
  try {
    BaseAPI.saveGameResults(JSON.stringify(tempResults));
    localStorage.removeItem(game);
  } catch (error) {}
};

const getResults = async (items, game, mode) => {
  let isitem = items[0].hasOwnProperty("item");
  let lid = items.map((el) => {
    return isitem ? el.item.id : el.id;
  });
  try {
    let res = await BaseAPI.getGameResults(lid, game + mode);

    let lidarr = items.map((el) => {
      let pr = res.data[isitem ? el.item.id : el.id];
      return { ...el, probability: pr ? pr : 10 };
    });
    localStorage.removeItem(game);
    return lidarr;
  } catch (error) {
    return [];
  }
};

export const addProbabilities = async (items, game, mode, setAllItems) => {
  try {
    let lidarr = await getResults(items, game, mode);
    setAllItems(lidarr);
  } catch (error) {}
};
