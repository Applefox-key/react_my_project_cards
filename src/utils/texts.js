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
        tab === "tab1"
          ? "question ; answer ; note"
          : tab === "tab2"
          ? "questions"
          : `question row and then answer row`
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

    let contentArr = [];
    if (tab === "tab1")
      contentArr = contArr.map((row, i) => {
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
      });
    if (tab === "tab2")
      contentArr = contArr.map((row, i) => {
        return {
          id: i,
          question: row,
          answer: contArr2[i],
          note: "",
        };
      });
    if (tab === "tab3") {
      if (contArr.length % 2 !== 0) {
        setPopupAdvise(
          "the quantity of questions does not match to the answers"
        );
        return;
      }
      for (let i = 0; i < contArr.length; i += 2) {
        const element = {
          id: i / 2,
          question: contArr[i] ? contArr[i] : "",
          answer: contArr[i + 1] ? contArr[i + 1] : "",
          note: "",
        };
        contentArr.push(element);
      }
    }
    callbackForResult(contentArr);
  } catch (error) {
    setPopupAdvise(error.message);
    return;
  }
};

export const onlyLetters = (text) => {
  let res = text.replace(/[^\wа-яёa-z]/gi, "");
  res = res.replace(/\s/g, "");
  return res.toLowerCase();
};
export const onlyLettersNumbers = (text) => {
  let res = text.replace(/[^\wа-яёa-z]/gi, "");
  res = res.replace(/\s/g, "");
  return res.toLowerCase();
};
export const getDifferences = (str1, str2) => {
  const cleanString = (str) => {
    return str
      .toLowerCase()
      .replace(/[.,/#?!$%&;:{}=_`~()]/g, "")
      .replace(/\s{2,}/g, " ")
      .trim();
  };

  const cleanStr1 = cleanString(str1);
  const cleanStr2 = cleanString(str2);

  const words1 = cleanStr1.split(" ");
  const words2 = cleanStr2.split(" ");
  //create a matrix
  const lcsMatrix = Array(words1.length + 1)
    .fill(null)
    .map(() => Array(words2.length + 1).fill(0));

  // filling the matrix
  for (let i = 1; i <= words1.length; i++) {
    for (let j = 1; j <= words2.length; j++) {
      if (words1[i - 1] === words2[j - 1]) {
        lcsMatrix[i][j] = lcsMatrix[i - 1][j - 1] + 1; // words are the same
      } else {
        lcsMatrix[i][j] = Math.max(lcsMatrix[i - 1][j], lcsMatrix[i][j - 1]); // word are different - get the max from up or left
      }
    }
  }

  // get the lcs
  let i = words1.length;
  let j = words2.length;
  const lcs = [];
  const indexes1 = [];
  const indexes2 = [];

  while (i > 0 && j > 0) {
    if (words1[i - 1] === words2[j - 1]) {
      lcs.unshift(words1[i - 1]); //words are the same -- add to the LCS
      indexes1.unshift(i - 1); //save OK index for the first string
      indexes2.unshift(j - 1); //save OK index for the second string
      i--;
      j--;
    } else if (lcsMatrix[i - 1][j] > lcsMatrix[i][j - 1]) {
      i--; // words are different - go to the max (this is up)
    } else {
      j--; // words are different - go to the max (this is left)
    }
  }

  // if word is not in lcs then it is different

  const differences1 = words1.map((word, i) => {
    return { word, isDifferent: !indexes1.includes(i) };
  });
  const differences2 = words2.map((word, i) => {
    return { word, isDifferent: !indexes2.includes(i) };
  });

  return { differences1, differences2 };
};
export const formatString = (input) => {
  if (!input) return input;
  let trimmed = input.trim().replace(/\s+/g, " ");

  let capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  const wordCount = capitalized.split(" ").length;
  if (wordCount >= 4 && !capitalized.endsWith(".")) {
    capitalized += ".";
  }

  return capitalized;
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
