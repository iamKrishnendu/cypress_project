require("dotenv").config();
const { describe, it, after, before } = require("mocha");
const Page = require("../pages/SL_MarketingPage");
const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
const addContext = require("mochawesome/addContext");
const { getDatafromGeneralSheet, getData } = require("../utils/excelParser");
chai.use(chaiAsPromised);
Page.prototype.getFailedStepScreenShot = async function() {
  let screenshotPath = await this.takeScreenshot("Failed Step");
  return screenshotPath;
};
process.on("unhandledRejection", () => {});

(async function testSuite() {
  try {
    let driver, page;
    let SL_QA_URL = process.env.StarLabs_QA;
    before(async function() {
      this.timeout(150000);
      page = new Page();
      driver = page.driver;
      await page.visit(SL_QA_URL);
    });

    describe("Log into StarLabs QA through nuxeo QA homepage", async function() {
      it("On nuxeo qa homepage: enter licensee username and password and click on Sign in button", async function() {
        this.timeout(150000);
        const result = await page.loginThroughNuxeoHomepageQA();
        expect(result.usernameFiledEnabled).to.equal(true);
        expect(result.passwordFieldEnabled).to.equal(true);
      });
    });
    // describe("Marketing Job submission page component validation", async function() {
    //   it("Select Marketing as Submission Job option", async function() {
    //     this.timeout(150000);
    //     const marketingPageHeader = await page.selectSubmitjobOptionsAsMarketing();
    //     console.log(marketingPageHeader);
    //     expect(marketingPageHeader).to.equal("Marketing");
    //   });
    //   it("Tooltip message validation for each fields", async function() {
    //     this.timeout(150000);
    //     let fieldtooltipValues = await getData(
    //       "SL_marketing_react_component",
    //       "Field_Names"
    //     );

    //     let actualToolTipMsg,
    //       pageToolTip = [];
    //     await page.marketingSubmissionPageFields();
    //     pageToolTip = await page.marketingSubmissionPageFields();

    //     console.log("Size of pageToolTip: " + pageToolTip.length);
    //     for (let index = 0; index < pageToolTip.length; index++) {
    //       actualToolTipMsg = fieldtooltipValues.split("::")[index];
    //       console.log(
    //         "Expected ToolTipMsg: " +
    //           actualToolTipMsg +
    //           " : Actual ToolTipMsg frompage: " +
    //           (await pageToolTip[index].getAttribute("title")) +
    //           " "
    //       );
    //       if (
    //         actualToolTipMsg != undefined &&
    //         actualToolTipMsg.trim() ===
    //           (await pageToolTip[index].getAttribute("title"))
    //       ) {
    //         expect(actualToolTipMsg.trim()).to.equal(
    //           await pageToolTip[index].getAttribute("title")
    //         );
    //       }
    //     }
    //   });
    //   it("ToolTip message displayed on the page while hovering mouse pointer on the fields", async function() {
    //     this.timeout(150000);
    //     await page.tootlTipMessageDisplayedOnPage();
    //   });
    // });
    // describe("Process Marketing Job submission", async function() {
    //   it("Validate Licensee field. If value is pre-selected then proceed or select valid licensee name", async function() {
    //     this.timeout(150000);
    //     let licensee_name = await getData(
    //       "SL_marketing_react_component",
    //       "licensee_name"
    //     );
    //     let property = await getData(
    //       "SL_marketing_react_component",
    //       "property"
    //     );
    //     let result = await page.processMarketingSubmission();

    //     console.log("result : " + result);
    //     expect(result).to.equal(licensee_name.trim());
    //   });

    //   it("Enter Contract ID and Validate the field value", async function() {
    //     this.timeout(150000);
    //     let actualContractValue = await getData(
    //       "SL_marketing_react_component",
    //       "contract_id"
    //     );
    //     let result = await page.returnPageValue();
    //     expect(result.contractValue).to.equal(actualContractValue.trim());
    //   });
    //   it("Enter Territories and Validate the field value", async function() {
    //     this.timeout(150000);
    //     let actualTerritoriesValue = await getData(
    //       "SL_marketing_react_component",
    //       "territories"
    //     );
    //     let result = await page.returnPageValue();
    //     expect(result.terrioteriesValue).to.equal(
    //       actualTerritoriesValue.trim()
    //     );
    //   });
    //   it("Enter Property and Validate the field value", async function() {
    //     this.timeout(150000);
    //     let actualPropertyValue = await getData(
    //       "SL_marketing_react_component",
    //       "property"
    //     );
    //     let result = await page.returnPageValue();
    //     expect(result.propertyValue).to.equal(actualPropertyValue.trim());
    //   });
    //   it("Enter Tier Of Distribution and Validate the field value", async function() {
    //     this.timeout(150000);
    //     let actualTODValue = await getData(
    //       "SL_marketing_react_component",
    //       "tier_of_distribution"
    //     );
    //     let result = await page.returnPageValue();
    //     expect(result.tierOfDistributionValue).to.equal(actualTODValue.trim());
    //   });
    //   it("Enter Retailer and Validate the field value", async function() {
    //     this.timeout(150000);
    //     let actualRetailerValue = await getData(
    //       "SL_marketing_react_component",
    //       "retailer"
    //     );
    //     let result = await page.returnPageValue();
    //     expect(result.retailerValue).to.equal(actualRetailerValue.trim());
    //   });
    //   it("Enter Consumer Target and Validate the field value", async function() {
    //     this.timeout(150000);
    //     let actualConsumerTargetValue = await getData(
    //       "SL_marketing_react_component",
    //       "consumer_target"
    //     );
    //     let result = await page.returnPageValue();
    //     expect(result.consumer_targetValue).to.equal(
    //       actualConsumerTargetValue.trim()
    //     );
    //   });
    //   it("Enter Product Details and Validate the field value", async function() {
    //     this.timeout(150000);
    //     let actualProductDetails = await getData(
    //       "SL_marketing_react_component",
    //       "product_detail"
    //     );
    //     let result = await page.returnPageValue();
    //     expect(result.product_detailValue).to.equal(
    //       actualProductDetails.trim()
    //     );
    //   });
    //   it("Enter Asset File and Validate the field value", async function() {
    //     this.timeout(150000);
    //     let actualAssetFileName = await getData(
    //       "SL_marketing_react_component",
    //       "assetFile_name"
    //     );
    //     let result = await page.returnPageValue();
    //     expect(result.asset_fileValue).to.equal(actualAssetFileName.trim());
    //   });
    //   it("Enter Charecters and Validate the field value", async function() {
    //     this.timeout(150000);
    //     let actualCharectersValue = await getData(
    //       "SL_marketing_react_component",
    //       "charecters"
    //     );
    //     let result = await page.returnPageValue();
    //     expect(result.charecterValue).to.equal(actualCharectersValue.trim());
    //   });
    // });
    describe("Proceed with WorkFront to complete job lifecycle", async function() {
      it("Select Job from top menu and Loged in as BA to WorkFront", async function() {
        this.timeout(150000);
        await page.selectjobFromMenuBarAndLoginToWorkFront();
      });
      it("Login as Licensee and submit the approved job for further review", async function() {
        this.timeout(150000);
        await page.processTheJobInWorkFrontThroughJobSectionAsLicensee();
      });
    });
    afterEach(async function() {
      this.timeout(150000);
      if (this.currentTest.state === "failed") {
        let screenshotPath = await page.getFailedStepScreenShot();
        console.log("Failed screenshot path: " + screenshotPath);
        addContext(this, screenshotPath);
        throw new Error(
          "Step failed. Exapand the failed step to see the snapshot of failed step"
        );
      }
    });
    // after(async function() {
    //   console.log("End Test. Closing all instances of Browser");
    //   this.timeout(150000);

    //   await page.quit();
    // });
  } catch (ex) {
    console.log(new Error(ex.message));
  } finally {
  }
})();
