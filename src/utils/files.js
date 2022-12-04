export const contentFromTxtFile = async (file, callbackForResult) => {
  if (!file) throw new Error("no file selected");
  if (file.type !== "text/plain") throw new Error("wrong file type");
  const text = await file.text();
  // const contArr = text.split(/\r/).filter((item) => item.trim());
  const contArr = text.split(/[\r\n]/).filter((item) => item.trim());
  const expressionArr = contArr.map((row) => {
    let [s1, s2, t] = row.replace("  ", " ").split(";");
    return { question: s1 ? s1 : "", answer: s2 ? s2 : "", note: t ? t : "" };
  });

  callbackForResult(expressionArr);
};

export const expressionsFromTxtFile = async (file, callbackForResult) => {
  if (!file) throw new Error("no file selected");
  if (file.type !== "text/plain") throw new Error("wrong file type");

  const text = await file.text();
  const contArr = text.split(/\r/).filter((item) => item.trim());
  const expressionArr = contArr.map((row) => {
    let [w, s] = row.replace("  ", " ").split(";");
    return { expression: w ? w : "", phrase: s ? s : "" };
  });

  callbackForResult(expressionArr);
};

const valueOrEmpty = (val) => (val ? val + ";" : "");

export const createFilesDataColl = (list) => {
  const content = list
    .map(
      (el) =>
        valueOrEmpty(el.question) +
        valueOrEmpty(el.answer) +
        valueOrEmpty(el.note)
    )
    .join("\n");

  const data = new Blob([content], { type: "text/plain" });
  return data;
};
