import BaseAPI from "../API/BaseAPI";
import { shuffle } from "./arraysFunc";

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

//RATEs
// const getRates = async (items) => {
//   let isArr = Array.isArray(items);
//   let iscontent = isArr && items[0].hasOwnProperty("content");
//   let tmpArr = iscontent ? items[0].content : isArr ? items : [items];
//   let lid = tmpArr.map((el) => {
//     return el.id;
//   });
//   try {
//     let res = await BaseAPI.getGameResults(lid, "cardr");
//     let lidarr = tmpArr.map((el) => {
//       let pr = res.data[el.id];
//       return { ...el, rate: pr ? pr - 10 : 0 };
//     });
//     const mainResult = iscontent ? [{ ...items[0], content: lidarr }] : lidarr;
//     return isArr ? mainResult : mainResult[0];
//   } catch (error) {
//     return items;
//   }
// };
// export const addRates = async (items) => {
//   try {
//     let lidarr = await getRates(items);
//     return lidarr;
//   } catch (error) {}
// };

//update rate
export const updRates = async (item, newRate) => {
  try {
    BaseAPI.editContentRate(item.id, newRate);
  } catch (error) {}
  // try {
  //   BaseAPI.saveGameResults(
  //     JSON.stringify({ [item.id]: { "cardr": newRate + 10 } })
  //   );
  // } catch (error) {}
};

//update probability of the element and get new random num based on the probabilities
export const recount = (isRight, arr, num, shuffleField = "") => {
  const delta = isRight ? -1 : 1;
  //find total SUM and form new array with new propability
  let totalSum = 0;
  const newArr = arr.map((item, i) => {
    if (i === num) {
      const newProbability = Math.min(
        Math.max(item.probability + delta, 1),
        20
      );
      totalSum += newProbability;

      if (shuffleField && isRight) {
        let shuffeled = shuffle([...item[shuffleField]]);
        return {
          ...item,
          [shuffleField]: shuffeled,
          probability: newProbability,
        };
      }
      return { ...item, probability: newProbability };
    }
    totalSum += item.probability;
    return item;
  });
  // SUM "index"
  // const totalSum = newArr.reduce((sum, item) => sum + item.probability, 0);
  // rundom from 1 to totalSum
  const randomValue = Math.floor(Math.random() * totalSum) + 1;
  let numb = 0;
  for (let i = 0; i < newArr.length; i++) {
    numb += newArr[i].probability;
    if (randomValue < numb) return [i, newArr];
  }

  return [newArr.length - 1, newArr];
};
