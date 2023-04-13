export const contentFromText = async (
  text,
  callbackForResult,
  setPopupAdvise,
  auto = false,
  separator = ";",
  tab
) => {
  if (!text.one) {
    setPopupAdvise(
      `please paste:  ${
        tab === "tab1" ? "question ; answer ; note" : "questions"
      }`
    );
    return;
  }
  if (!text.two && tab === "tab2") {
    setPopupAdvise(`please paste: answers`);
    return;
  }

  try {
    const contArr = text.one.split(/\n/).filter((item) => item.trim());
    if (!contArr) {
      setPopupAdvise("failed to recognize content");
      return;
    }
    const contArr2 = text.two.split(/\n/).filter((item) => item.trim());
    if (!contArr2 && tab === "tab2") {
      setPopupAdvise("failed to recognize content");
      return;
    }
    if (tab === "tab2" && contArr2.length !== contArr.length) {
      setPopupAdvise("the quantity of questions does not match to the answers");
      return;
    }

    let contentArr =
      tab === "tab1"
        ? contArr.map((row, i) => {
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
          })
        : contArr.map((row, i) => {
            return {
              id: i,
              question: row,
              answer: contArr2[i],
              note: "",
            };
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
//font for the cards
export const fontS = ([tx, ti]) => {
  const tl = tx.length;
  if (ti) {
    if (tl < 6) return { fontSize: "7vw" };
    if (tl <= 60) return { fontSize: "2.7vw" };
    if (tl <= 130) return { fontSize: "1.7vw" };
    if (tl <= 160) return { fontSize: "1.5vw" };
    if (tl <= 180) return { fontSize: "1.8vw" };
    if (tl <= 350) return { fontSize: "1.1vw" };
    return { fontSize: "0.8vw" };
  } else {
    if (tl < 12) return { fontSize: "13vw" };
    if (tl <= 60) return { fontSize: "4.7vw" };
    if (tl <= 130) return { fontSize: "3.4vw" };
    if (tl <= 160) return { fontSize: "3vw" };
    if (tl <= 180) return { fontSize: "2.7vw" };
    if (tl <= 350) return { fontSize: "2.2vw" };
    return { fontSize: "1.7vw" };
  }
};
