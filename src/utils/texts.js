export const expressionsFromText = async (
  text,
  callbackForResult,
  setPopupAdvise,
  separator = ";"
) => {
  if (!text) {
    setPopupAdvise("please paste:  expression; phrase ");
    return;
  }

  try {
    const contArr = text.split(/\n/).filter((item) => item.trim());
    if (!contArr) {
      setPopupAdvise("failed to recognize expressions");
      return;
    }

    const expressionArr = contArr.map((row, i) => {
      let [p1, p2] = row.replace("  ", " ").split(separator);
      if (!p1 || !p2) return { id: i, expression: p1, phrase: p2 };
      if (p1.length > p2.length) return { id: i, expression: p2, phrase: p1 };
      else return { id: i, expression: p1, phrase: p2 };
    });

    callbackForResult(expressionArr);
  } catch (error) {
    setPopupAdvise(error.message);
    return;
  }
};

export const contentFromText = async (
  text,
  callbackForResult,
  setPopupAdvise,
  auto = true,
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
