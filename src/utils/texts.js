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
              arr.sort((a, b) => a.length - b.length);
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

  if (ti || ti === "null") {
    if (tl <= 5) return "fontSize_lengthImg5";
    if (tl <= 10) return "fontSize_lengthImg10";
    if (tl <= 20) return "fontSize_lengthImg20";
    if (tl <= 30) return "fontSize_lengthImg30";
    if (tl <= 40) return "fontSize_lengthImg40";
    if (tl <= 50) return "fontSize_lengthImg50";
    if (tl <= 100) return "fontSize_lengthImg100";
    if (tl <= 150) return "fontSize_lengthImg150";
    if (tl <= 200) return "fontSize_lengthImg200";
    if (tl <= 250) return "fontSize_lengthImg250";
    if (tl <= 300) return "fontSize_lengthImg300";
    if (tl <= 350) return "fontSize_lengthImg350";
    else return "fontSize_lengthImgLG";
  } else {
    if (tl <= 5) return "fontSize_length5";
    if (tl <= 10) return "fontSize_length10";
    if (tl <= 20) return "fontSize_length20";
    if (tl <= 30) return "fontSize_length30";
    if (tl <= 40) return "fontSize_length40";
    if (tl <= 50) return "fontSize_length50";
    if (tl <= 100) return "fontSize_length100";
    if (tl <= 150) return "fontSize_length150";
    if (tl <= 200) return "fontSize_length200";
    if (tl <= 250) return "fontSize_length250";
    if (tl <= 300) return "fontSize_length300";
    if (tl <= 350) return "fontSize_length350";
    else return "fontSize_lengthLG";
  }
};
//font for the  cards printing
export const fontPrint = ([tx, ti]) => {
  const tl = tx.length;

  if (ti) {
    if (tl <= 5) return "fontSize_printImg5";
    if (tl <= 10) return "fontSize_printImg10";
    if (tl <= 20) return "fontSize_printImg20";
    if (tl <= 30) return "fontSize_printImg30";
    if (tl <= 40) return "fontSize_printImg40";
    if (tl <= 50) return "fontSize_printImg50";
    if (tl <= 100) return "fontSize_printImg100";
    if (tl <= 150) return "fontSize_printImg150";
    if (tl <= 200) return "fontSize_printImg200";
    if (tl <= 250) return "fontSize_printImg250";
    if (tl <= 300) return "fontSize_printImg300";
    if (tl <= 350) return "fontSize_printImg350";
    return "fontSize_printImgLG";
  } else {
    if (tl <= 5) return "fontSize_print5";
    if (tl <= 10) return "fontSize_print10";
    if (tl <= 20) return "fontSize_print20";
    if (tl <= 30) return "fontSize_print30";
    if (tl <= 40) return "fontSize_print40";
    if (tl <= 50) return "fontSize_print50";
    if (tl <= 100) return "fontSize_print100";
    if (tl <= 150) return "fontSize_print150";
    if (tl <= 200) return "fontSize_print200";
    if (tl <= 250) return "fontSize_print250";
    if (tl <= 300) return "fontSize_print300";
    if (tl <= 350) return "fontSize_print350";
    return "fontSize_printLG";
  }
};

//font for the  cards printing
export const fontLittle = ([tx, ti]) => {
  const tl = tx.length;

  if (ti) {
    if (tl === 0) return "fontSize_little5 ";
    if (tl <= 5) return "fontSize_little5 d-block";
    if (tl <= 10) return "fontSize_little10 d-block";
    if (tl <= 20) return "fontSize_little20 d-block";
    if (tl <= 30) return "fontSize_little30 d-block";
    if (tl <= 40) return "fontSize_little40 d-block";
    if (tl <= 50) return "fontSize_little50 d-block";
    if (tl <= 100) return "fontSize_little100 d-block";
    if (tl <= 150) return "fontSize_little150 d-block";
    if (tl <= 200) return "fontSize_little200 d-block";
    if (tl <= 250) return "fontSize_little250 d-block";
    if (tl <= 300) return "fontSize_little300 d-block";
    if (tl <= 350) return "fontSize_little350 d-block";
    return "fontSize_littleLG d-block";
  } else {
    if (tl <= 5) return "fontSize_little5";
    if (tl <= 10) return "fontSize_little10";
    if (tl <= 20) return "fontSize_little20";
    if (tl <= 30) return "fontSize_little30";
    if (tl <= 40) return "fontSize_little40";
    if (tl <= 50) return "fontSize_little50";
    if (tl <= 100) return "fontSize_little100";
    if (tl <= 150) return "fontSize_little150";
    if (tl <= 200) return "fontSize_little200";
    if (tl <= 250) return "fontSize_little250";
    if (tl <= 300) return "fontSize_little300";
    if (tl <= 350) return "fontSize_little350";
    return "fontSize_littleLG";
  }
};
