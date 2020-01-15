const path = require("path");
const XLSX = require("xlsx");

var workbook = XLSX.readFile(path.join(__dirname) + "/testData.xlsx");

//Traversing all sheets
let getDatafromGeneralSheet = async () => {
  return new Promise((res, rej) => {
    var sheetName = "General";
    var sheetInJson = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    // console.log(sheetInJson);
    res(sheetInJson);
  });
};

let getDataFromSpecificSheet = async sheetname => {
  var sheetName = sheetname;
  var sheetInJson = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  //  console.log(sheetInJson.length);
  return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
};

let dataFromSheetBasedOnTestName = async testName => {
  return new Promise(async (res, rej) => {
    let dataFromGeneralSheet = [];
    let dataFromSpecificSheet = [];
    dataFromGeneralSheet = await getDatafromGeneralSheet();
    // dataFromSpecificSheet = await getDataFromSpecificSheet();
    // console.log("Provided TestName " + testName);
    //console.log(dataFromGeneralSheet.length);

    for (let count = 0; count < dataFromGeneralSheet.length; count++) {
      let testCaseName = dataFromGeneralSheet[count]["TEST_NAME"];
      let executionFlag = dataFromGeneralSheet[count]["EXECUTE"];
      console.log(testCaseName + " with execution flag " + executionFlag);
      if (testCaseName === testName && executionFlag === "Y") {
        let sheetName = dataFromGeneralSheet[count]["SHEET_NAME"];
        console.log("under coditional snippet with sheet name: " + sheetName);
        // console.log(dataFromSpecificSheet[count]["DATA_01"]);
        dataFromSpecificSheet = await getDataFromSpecificSheet(sheetName);
        res(dataFromSpecificSheet);
        //return dataFromSpecificSheet;
      }
      //  rej("Check datasheet once...");
    }
  });
};
let data = [];
async function fetchData(testCaseName, columnName) {
  return new Promise(async (resolve, reject) => {
    let fetchedData = null;
    try {
      data = await dataFromSheetBasedOnTestName(testCaseName);
      for (let index = 0; index < data.length; index++) {
        if (data[index]["TEST_NAME"] === testCaseName) {
          fetchedData = data[index][columnName];
          // console.log(data[index][columnName]);
          resolve(fetchedData);
          //  return fetchedData;
        }
      }
    } catch (execution) {
      reject("Execption occured at fetchedData....check it there!");
    }
  });
}
function getData(testCaseName, columnName) {
  return new Promise(async (res, rej) => {
    let columnValue = await fetchData(testCaseName, columnName);
    res(columnValue);
  });
}

async function test() {
  console.log(await getData("SL_marketing_react_component", "contract_id"));
}

//test();
// fetchData("homepage1", "DATA_02");
// fetchData("homepage1", "DATA_03");
// fetchData("homepage1", "DATA_04");
module.exports = {
  getDatafromGeneralSheet,
  getData
};
