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
export const gameMenuArr = (pageParam, isPublic = false, playlist = false) => {
  let urlPart = playlist ? "pl" : isPublic ? "pub" : "my";
  return [
    {
      name: "Cards: question - answer",
      symb: "❓",
      href: `/play_cards/${urlPart}/0/${pageParam.id}/${pageParam.name}`,
    },
    {
      name: " Cards: answer - question",
      symb: "❗",
      // symb: "⸘",
      href: `/play_cards/${urlPart}/1/${pageParam.id}/${pageParam.name}`,
    },
    {
      name: "Cards: time",
      symb: "⌛",
      href: `/play_timecard/${urlPart}/${pageParam.id}/${pageParam.name}`,
    },
    { name: "Divider", symb: "|", href: "" },
    {
      name: "Find pairs",
      symb: "🎏",
      href: `/play_pairs/${urlPart}/${pageParam.id}/${pageParam.name}`,
    },
    {
      name: "Find the right answer",
      symb: "🔠",
      href: `/play_test/${urlPart}/${pageParam.id}/${pageParam.name}`,
    },
    {
      name: "Write the right answer",
      symb: "🖍️",
      href: `/play_write/${urlPart}/0/${pageParam.id}/${pageParam.name}`,
    },
    //🖊️
    {
      name: "Write the right question",
      symb: "✏️",
      href: `/play_write/${urlPart}/1/${pageParam.id}/${pageParam.name}`,
    },
  ];
};
