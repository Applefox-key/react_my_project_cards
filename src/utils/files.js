import { parseExcel } from "./readXls";

const parseCSV = (csvText) => {
  const rows = csvText.split("\n");
  return rows.map((row) => row.replace(/^"|"$/g, "").split('","'));
};
const parseTxt = (text) => {
  const contArr = text.split(/[\r\n]/).filter((item) => item.trim());

  return contArr.map((row) => {
    let [s1, s2, t] = row.replace("  ", " ").split(";");
    return [s1, s2, t];
  });
};

export const contentFromFile = async (file) => {
  if (!file) throw new Error("no file selected");
  let parsedData;
  switch (file.type) {
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      try {
        parsedData = await parseExcel(file);
      } catch (error) {
        throw new Error("Error parsing Excel file");
      }
      break;
    case "text/csv":
      parsedData = parseCSV(await file.text());
      break;
    case "text/plain":
      parsedData = parseTxt(await file.text());
      break;

    default:
      throw new Error("wrong file type");
  }
  parsedData = parsedData.filter(
    (item) => item.filter((value) => value !== "").length >= 2
  );
  return parsedData;
};

const valueOrEmpty = (val) => (val ? val + ";" : "");

export const createFilesDataColl = (list, columnsArr = [1, 1, 1]) => {
  const content = list
    .map(
      (el) =>
        (columnsArr[0] ? valueOrEmpty(el.question) : "") +
        (columnsArr[1] ? valueOrEmpty(el.answer) : "") +
        (columnsArr[2] ? valueOrEmpty(el.note) : "")
    )
    .join("\n");

  const data = new Blob([content], { type: "text/plain" });
  return data;
};
