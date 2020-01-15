const path = require("path");
const fs = require("fs");

const rootscreenshotFolder = path.join(__dirname, "", "screenshot");
const rootTestOutPutFolder = path.join(__dirname, "", "test-output");
function generateFolderName() {
  var today = new Date().toISOString();
  var date = today.replace(/[:'",.]/gi, "");
  return date;
}

function createDirectory() {
  try {
    if (!fs.existsSync(rootscreenshotFolder)) {
      fs.mkdirSync(path.join(__dirname, "", "screenshot"));
    }

    let folderName = generateFolderName();
    fs.mkdirSync(path.join(rootscreenshotFolder, "", folderName));
    return path.join(rootscreenshotFolder, "", folderName);
  } catch (ex) {
    console.error(ex);
    throw new Exception(ex);
  }
}

function createTestOutPutDirectory() {
  try {
    if (!fs.existsSync(rootTestOutPutFolder)) {
      fs.mkdirSync(path.join(__dirname, "", "test-output"));
    }

    let folderName = generateFolderName();
    fs.mkdirSync(path.join(rootTestOutPutFolder, "", folderName));
    return path.join(rootTestOutPutFolder, "", folderName);
  } catch (ex) {
    console.error(ex);
    throw new Exception(ex);
  }
}

let generateTestOutPutFile = (testCaseName, submission, executionFlag) => {
  const folderPath = createTestOutPutDirectory();
  let outputOption = {
    TestName: testCaseName,
    DateOfExecution: "15/01/2020",
    Submission: submission,
    Execute: executionFlag
  };

  let filepath = folderPath + "/" + testCaseName + ".json";
  fs.writeFileSync(filepath, JSON.stringify(outputOption, null, 2));
};
generateTestOutPutFile("TestCase_001", "Q0000786", "Y");
module.exports = { createDirectory, generateTestOutPutFile };
