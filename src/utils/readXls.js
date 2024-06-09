const { read, utils } = require("xlsx");

export const parseExcel = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = read(data, { type: "array" });
      const result = [];
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      for (let rowNum = 1; ; rowNum++) {
        const questionCell = sheet[utils.encode_cell({ r: rowNum, c: 0 })];
        const answerCell = sheet[utils.encode_cell({ r: rowNum, c: 1 })];
        const noteCell = sheet[utils.encode_cell({ r: rowNum, c: 2 })];

        if (!questionCell && !answerCell && !noteCell) {
          break;
        }

        const question = questionCell ? questionCell.v : "";
        const answer = answerCell ? answerCell.v : "";
        const note = noteCell ? noteCell.v : "";

        result.push({ question, answer, note });
      }
      // return result;

      resolve(result);
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};
