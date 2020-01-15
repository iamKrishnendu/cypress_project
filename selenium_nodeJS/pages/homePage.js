let Page = require("./basePage");
const locator = require("../utils/locator");
const getData = require("../utils/excelParser");

//console.log(data[0]["DATA_1"]);
const searchInputSelectorxpath = locator.searchInputSelectorxpath;
const searchButtonSelectorName = locator.searchButtonSelectorName;
const resultConfirmationSelectorId = locator.resultConfirmationId;

//const fakeNameKeyword = fake.nameKeyword;

let searchInput, searchButton, resultStat;

Page.prototype.findInputAndButton = async function() {
  searchInput = await this.findByName(searchInputSelectorName);

  searchButton = await this.findByName(searchButtonSelectorName);
  console.log("For searchButton " + searchButton);
  const result = await this.driver.wait(async function() {
    const searchButtonText = await searchButton.getAttribute("value");
    const searchInputEnableFlag = await searchInput.isEnabled();

    return {
      inputEnabled: searchInputEnableFlag,
      buttonText: searchButtonText
    };
  }, 8000);
  return result;
};

Page.prototype.submitKeywordAndGetResult = async function() {};

Page.prototype.enterKeywordTotheSearchFacebook = async function() {
  console.log("Under write...");

  let data = await getData("homepage", "DATA_01");
  console.log(data);
  await this.sleep(2000);
  searchInput = await this.finByXpath(searchInputSelectorxpath);
  console.log("For searchInput " + searchInput);
  await this.write(searchInput, data);
  await this.takeScreenshot("facebookSearch");
  await this.takeScreenshot("facebookSearch1");
};

Page.prototype.enterKeywordTotheSearchGitHub = async function() {
  console.log("Under write...");

  let data = await getData("homepage1", "DATA_01");
  console.log(data);
  await this.sleep(2000);
  searchInput = await this.finByXpath(searchInputSelectorxpath);
  await this.write(searchInput, data);
  await this.takeScreenshot("gitHub search");
};

module.exports = Page;
