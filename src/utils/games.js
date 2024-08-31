// import BaseAPI from "../API/BaseAPI";
import { BsCardHeading, BsUiChecksGrid } from "react-icons/bs";
import { shuffle } from "./arraysFunc";
import {
  PiPlugsConnectedFill,
  PiPuzzlePiece,
  PiPuzzlePieceLight,
} from "react-icons/pi";
import { TfiTimer } from "react-icons/tfi";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { FaRegKeyboard } from "react-icons/fa";
import { RiPuzzle2Line } from "react-icons/ri";

export const pairAnswerCheck = (id1, id2, itemsV) => {
  let arr1 = [...itemsV[0]];
  let arr2 = [...itemsV[1]];
  let ind1 = itemsV[0].findIndex((el) => el.id.toString() === id1.toString());
  let ind2 = itemsV[1].findIndex((el) => el.id.toString() === id2.toString());

  if (id1 === id2) {
    arr1.splice(ind1, 1);
    arr2.splice(ind2, 1);
    return [true, arr1, arr2];
  } else {
    if (arr1[(0, ind1)].answer === arr2[(1, ind2)].answer) {
      arr1.splice(ind1, 1);
      arr2.splice(ind2, 1);
      return [true, arr1, arr2];
    }
    return [false];
  }
};
export const testAnswerCheck = (num, id2, items) => {
  if (items[num].item.id.toString() === id2.toString()) return true;
  let writeAnswer = items[num].item.answer.toString();
  let ind2 = items[num].answ.findIndex(
    (el) => el.id.toString() === id2.toString()
  );

  let userAnswer = items[num].answ[ind2].answer.toString();

  return writeAnswer === userAnswer;
};

export const formatContentParts = (arr, mode) => {
  shuffle(arr);
  let res = arr.map((el, i) => {
    let parts = mode ? el.question : el.answer;
    //remove extra spaces
    parts = parts.trim().toLowerCase().replace(/\s+/g, " ");
    //analyse parts
    if (!parts.length) return null;
    let spaceCount = 0;
    for (let i = 0; i < parts.length; i++) {
      if (parts[i] === " ") {
        spaceCount++;
      }
    }
    if (spaceCount < 2) {
      let a = [...parts];
      let answ = shuffle(a);

      return { item: el, parts: answ, answ: [...parts] };
    }
    if (spaceCount < 10) {
      let a = parts.split(" ");
      let answ = shuffle(a);
      return { item: el, parts: answ, answ: parts.split(" ") };
    }
    return null;
  });
  return res.filter((el) => el !== null);
};

export const gameMenuArr = (pageParam, isPublic = false, playlist = false) => {
  let urlPart = playlist ? "pl" : isPublic ? "pub" : "my";
  return [
    // {
    //   name: "Cards",
    //   symb: "⏹️",
    //   type: "menu",
    //   items: [
    //     {
    //       type: "item",
    //       name: "Cards: question - answer",
    //       symb: "❓",
    //       href: `/play_cards/${urlPart}/0/${pageParam.id}/${pageParam.name}`,
    //     },
    //     {
    //       type: "item",
    //       name: " Cards: answer - question",
    //       symb: "❗",
    //       // symb: "⸘",
    //       href: `/play_cards/${urlPart}/1/${pageParam.id}/${pageParam.name}`,
    //     },
    //   ],
    // },
    {
      type: "item",
      name: "Cards: gallery",
      symb: <BsCardHeading />,
      href: `/play_cards/${urlPart}/0/${pageParam.id}/${pageParam.name}`,
    },

    {
      type: "item",
      name: "Cards: time",
      symb: <TfiTimer />,
      href: `/play_timecard/${urlPart}/${pageParam.id}/${pageParam.name}`,
    },

    {
      type: "item",
      name: "Find pairs",
      symb: <PiPlugsConnectedFill />,
      href: `/play_pairs/${urlPart}/${pageParam.id}/${pageParam.name}`,
    }, //🎏
    { type: "Divider", name: "Divider", symb: "|", href: "" },

    {
      type: "item",
      name: "Test",
      symb: <BsUiChecksGrid />,
      href: `/play_test/${urlPart}/0/${pageParam.id}/${pageParam.name}`,
    },

    {
      type: "item",
      name: "Write...",
      symb: <FaRegKeyboard />,
      href: `/play_write/${urlPart}/0/${pageParam.id}/${pageParam.name}`,
    },

    {
      type: "item",
      name: "Parts...",
      symb: <PiPuzzlePiece />,
      href: `/play_parts/${urlPart}/0/${pageParam.id}/${pageParam.name}`,
    },
  ];
};
