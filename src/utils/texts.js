export const contentFromText = async (
  text,
  callbackForResult,
  setPopupAdvise,
  auto = false,
  separator = ";"
) => {
  if (!text) {
    setPopupAdvise("please paste:  question ; answer ; note");
    return;
  }

  try {
    const contArr = text.split(/\n/).filter((item) => item.trim());
    if (!contArr) {
      setPopupAdvise("failed to recognize content");
      return;
    }
    const contentArr = contArr.map((row, i) => {
      let arr = row
        .replace("  ", " ")
        .split(separator)
        .filter((el) => el);
      if (auto) {
        //automatically determine the column name
        arr.sort((a, b) => a.length - b.length); //q n a
        if (arr.length === 2) arr.splice(1, 0, "");
        return { id: i, question: arr[0], answer: arr[2], note: arr[1] };
      } else {
        return { id: i, question: arr[0], answer: arr[1], note: arr[2] };
      }
    });
    callbackForResult(contentArr);
  } catch (error) {
    setPopupAdvise(error.message);
    return;
  }
};

export const onlyLetters = (text) => {
  let res = text.replace(/\W/g, "");
  res = res.replace(/[0-9]/g, "");
  res = res.replace(/\s/g, "");
  return res.toLowerCase();
};
