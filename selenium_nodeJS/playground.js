const path = require("path");
const fs = require("fs");
const extension = ".html";

const reportFolder = path.join(__dirname, "", "mochawesome-report");
var targetFile = fs.readdirSync(reportFolder).filter(function(file) {
  if (path.extname(file).toLowerCase() === extension) return file;
});
const fileName = returnReportName();
function returnReportName() {
  let index = targetFile.length;
  let expectedFileName = targetFile[index - 1];
  console.log(expectedFileName);
  return expectedFileName;
}

const renameFile =
  fileName.split("_", 4)[0] +
  "_" +
  fileName.split("_", 4)[1] +
  "_" +
  fileName.split("_", 4)[2] +
  "_" +
  fileName.split("_", 4)[3] +
  ".html";

console.log(renameFile);

let copyAndrenameFile = () => {
  var fileLocation = reportFolder + "/" + fileName;
  var destFile =
    reportFolder + "/Dashboard/" + "Automated_Test_Repoting_Dashboard.html";
  console.log("File location: " + fileLocation);
  fs.copyFileSync(fileLocation, destFile, "");
  var bodyData = fs.readFileSync(fileLocation, "utf8");
  //  console.log(bodyData);
};
copyAndrenameFile();
