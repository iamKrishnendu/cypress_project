const { describe, it, after, before } = require("mocha");
const addContext = require("mochawesome/addContext");
let Page = require("../pages/basePage");

const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

Page.prototype.getFailedStepScreenShot = async function() {
  let screenshotPath = await this.takeScreenshot("Failed Step");
  return screenshotPath;
};

process.on("unhandledRejection", () => {});

(async function example() {
  try {
    describe("Google search automated testing", async function() {
      this.timeout(80000);
      let driver, page;

      beforeEach(async () => {
        page = new Page();
        driver = page.driver;
        await page.visit("https://www.google.com/");
      });

      after(async () => {
        await page.quit();
      });

      it("enter facebook into the search box", async () => {
        this.timeout("300000");

        await page.enterKeywordTotheSearchFacebook();
      });
    });
    afterEach(async function() {
      if (this.currentTest && this.currentTest.state === "failed") {
        let screenshotPath = await getFailedStepScreenShot();
        console.log("Failed screenshot path: " + screenshotPath);
        addContext(this, screenshotPath);
      }
    });
  } catch (ex) {
    console.log(new Error(ex.message));
  } finally {
  }
})();
