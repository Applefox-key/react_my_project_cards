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
export const gameMenuArr = (pageParam, isPublic = false) => [
  {
    name: "Cards: question - answer",
    symb: "?!",
    href: `/play_cards/${isPublic ? "pub" : "my"}/0/${pageParam.id}/${
      pageParam.name
    }`,
  },
  {
    name: " Cards: answer - question",
    symb: "⁉️",
    href: `/play_cards/${isPublic ? "pub" : "my"}/1/${pageParam.id}/${
      pageParam.name
    }`,
  },
  {
    name: "Cards: time",
    symb: "⌛",
    href: `/play_timecard/${isPublic ? "pub" : "my"}/${pageParam.id}/${
      pageParam.name
    }`,
  },
  { name: "Divider", symb: "|", href: "" },
  {
    name: "Find pairs",
    symb: "🎏",
    href: `/play_pairs/${isPublic ? "pub" : "my"}/${pageParam.id}/${
      pageParam.name
    }`,
  },
  {
    name: "Find the right answer",
    symb: "🔠",
    href: `/play_test/${isPublic ? "pub" : "my"}/${pageParam.id}/${
      pageParam.name
    }`,
  },
  {
    name: "Write the right answer",
    symb: "🖊️",
    href: `/play_write/${isPublic ? "pub" : "my"}/${pageParam.id}/${
      pageParam.name
    }`,
  },
];
