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

export const gameMenuArrPub = (pageParam) => [
  {
    name: "Cards: question - answer",
    href: `/play_cards/pub/0/${pageParam.id}/${pageParam.name}`,
  },
  {
    name: " Cards: answer - question",
    href: `/play_cards/pub/1/${pageParam.id}/${pageParam.name}`,
  },
  {
    name: "Cards: time",
    href: `/play_timecard/pub/${pageParam.id}/${pageParam.name}`,
  },
  { name: "Divider", href: "" },
  {
    name: "Find pairs",
    href: `/play_pairs/pub/${pageParam.id}/${pageParam.name}`,
  },
  {
    name: "Find the right answer",
    href: `/play_test/pub/${pageParam.id}/${pageParam.name}`,
  },
  {
    name: "Write the right answer",
    href: `/play_write/pub/${pageParam.id}/${pageParam.name}`,
  },
];
export const gameMenuArrPriv = (pageParam) => [
  {
    name: "Cards: question - answer",
    href: `/play_cards/my/0/${pageParam.id}/${pageParam.name}`,
  },
  {
    name: " Cards: answer - question",
    href: `/play_cards/my/1/${pageParam.id}/${pageParam.name}`,
  },
  {
    name: "Cards: time",
    href: `/play_timecard/my/${pageParam.id}/${pageParam.name}`,
  },
  { name: "Divider", href: "" },
  {
    name: "Find pairs",
    href: `/play_pairs/my/${pageParam.id}/${pageParam.name}`,
  },
  {
    name: "Find the right answer",
    href: `/play_test/my/${pageParam.id}/${pageParam.name}`,
  },
  {
    name: "Write the right answer",
    href: `/play_write/my/${pageParam.id}/${pageParam.name}`,
  },
];
