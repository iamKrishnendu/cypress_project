const { exec } = require("child_process");
const path = require("path");
const XLSX = require("xlsx");
const { getDatafromGeneralSheet, getData } = require("../utils/excelParser");
var dataFromGeneralSheet = [];

(async function executionBegin() {
  try {
    dataFromGeneralSheet = await getDatafromGeneralSheet();
    for (let count = 0; count < (await dataFromGeneralSheet.length); count++) {
      let testCaseName = dataFromGeneralSheet[count]["TEST_NAME"];
      let executionFlag = dataFromGeneralSheet[count]["EXECUTE"];

      if (executionFlag === "Y") {
        console.log("Currently executing---> " + testCaseName);
        await executeFile(testCaseName);
      } else if (executionFlag === undefined) {
        console.log(new Error("EXECUTE field left as Blank in testData sheet"));
        return;
      }
    }
  } catch (ex) {
    throw new Error(
      "It seems you have forgot to mark the Execution Flag as Y in testData sheet"
    );
  }
})();
let executeFile = async fileName => {
  exec(`npm run test ./test/${fileName}.test.js`, (error, stdout, stderr) => {
    if (error) {
      console.log(`npm run test ./test/${fileName}.test.js`);
      console.error(`exec error: ${error.stack} `);
      return;
    }

    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
};
