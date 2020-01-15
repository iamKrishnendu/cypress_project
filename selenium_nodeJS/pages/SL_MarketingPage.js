require("dotenv").config();
const { Builder, By, until } = require("selenium-webdriver");
let Page = require("./basePage");
const homepageLocator_qa = require("../pageObjectRepository/SL_homepage_QA_locator");
const marketingPage_Locator = require("../pageObjectRepository/SL_Marketing_React_Locator");
const workfrontpage_locator = require("../pageObjectRepository/SL_JobTab_WorkFront_locator");
//const getData = require("../utils/excelParser");
const { getDatafromGeneralSheet, getData } = require("../utils/excelParser");
//Assign locators of nuxeo qa homepage

const nuxeo_username = homepageLocator_qa.nuxeo_username;
const nuxeo_password = homepageLocator_qa.nuxeo_password;
const nuxeo_loginBtn = homepageLocator_qa.nuxeo_loginBtn;
const marketing_job_option = marketingPage_Locator.marketing_job_option;
const marketing_page_title = marketingPage_Locator.marketing_page_title;
const marketing_all_fields = marketingPage_Locator.marketing_all_fields;
const marketing_field_toolTip = marketingPage_Locator.marketing_field_toolTip;
const licenseeName_field = marketingPage_Locator.licenseeName_field;
const licenseeName_fieldValue = marketingPage_Locator.licenseeName_fieldValue;
const listBox_values = marketingPage_Locator.listBox_values;
const contract_field = marketingPage_Locator.contract_field;
const contract_field_value = marketingPage_Locator.contract_field_value;
const terrioteries_field = marketingPage_Locator.terrioteries_field;
const properties_field = marketingPage_Locator.properties_field;
const tireOfDistribution_field = marketingPage_Locator.tireOfDistribution_field;
const retailer_field = marketingPage_Locator.retailer_field;
const consumerTarget_field = marketingPage_Locator.consumerTarget_field;
const product_details = marketingPage_Locator.product_details;
const asset_file = marketingPage_Locator.asset_file;
const charecters = marketingPage_Locator.charecters;
const marketingChannel_field = marketingPage_Locator.marketingChannel_field;
const marketing_start_date = marketingPage_Locator.marketing_start_date;
const marketing_end_date = marketingPage_Locator.marketing_end_date;
const date_value = marketingPage_Locator.date_value;
const upload_design_button = marketingPage_Locator.upload_design_button;
const job_submit_button = marketingPage_Locator.job_submit_button;
const file_destination = marketingPage_Locator.file_destination;
const submit_designButton = marketingPage_Locator.submit_designButton;
const fileuploaded = marketingPage_Locator.fileuploaded;
const jobID = marketingPage_Locator.jobID;
const home_button = workfrontpage_locator.homeButton;
const workfront_username = workfrontpage_locator.workfront_username;
const workfront_password = workfrontpage_locator.workfront_password;
const workfront_loginButton = workfrontpage_locator.workfront_loginButton;
const workfront_searchBox = workfrontpage_locator.searchBox;
const workfront_showAllOption = workfrontpage_locator.showAll_panel_on_search;
const workfront_list_of_jobs = workfrontpage_locator.list_of_jobs;
var usernameTextBox, passwordTextBox, loginButton;
let licensee_QA_username = process.env.licensee_QA_username;
let licensee_QA_password = process.env.licensee_QA_password;
let WF_licensee_QA_username = process.env.WF_licensee_QA_username;
let WF_licensee_QA_password = process.env.WF_licensee_QA_password;

Page.prototype.loginThroughNuxeoHomepageQA = async function() {
  usernameTextBox = await this.findById(nuxeo_username);
  passwordTextBox = await this.findById(nuxeo_password);
  loginButton = await this.finByCSSLocator(nuxeo_loginBtn);

  const result = await this.driver.wait(async function() {
    const usernameFlag = await usernameTextBox.isEnabled();
    const passwordFlag = await passwordTextBox.isEnabled();

    return {
      usernameFiledEnabled: usernameFlag,
      passwordFieldEnabled: passwordFlag
    };
  }, 30000);

  await this.write(usernameTextBox, licensee_QA_username);
  await this.write(passwordTextBox, licensee_QA_password);
  await this.performclick(loginButton);
  await this.takeScreenshot("nuxeoHomePage");
  await this.sleep(2000);
  return result;
};

Page.prototype.selectSubmitjobOptionsAsMarketing = async function() {
  let nuxeoApp_root = await this.finByCSSLocator("nuxeo-app");
  //await this.awaitToLoadElement(nuxeoApp_root);
  console.log("Locator present in DOM");

  await this.takeScreenshot("StarLabsHomePage");
  await this.sleep(2000);
  let shadowHost1 = this.finByCSSLocator("nuxeo-app");
  let element1 = await this.findShadowDomElement(shadowHost1, "wbcp-header");
  let element2 = await this.findShadowDomElement(
    element1,
    "a[class='submitJob-a']"
  );
  await this.sleep(2000);
  await this.movemousePointerAndClick(element2);
  await this.sleep(2000);
  let element3 = await this.findShadowDomElement(
    element1,
    marketing_job_option
  );

  await this.performclick(element3);

  const marketingPageTitle = await this.finByXpath(marketing_page_title);
  const pageTitle = await this.driver.wait(async function() {
    const headerTxt = marketingPageTitle.getText();
    return headerTxt;
  }, 20000);
  await this.takeScreenshot("marketing_submission_page");
  return pageTitle;
};

Page.prototype.marketingSubmissionPageFields = async function() {
  let actualToolTipValuesFromPage = [];
  let submissionPageFields = await this.driver.findElements(
    By.xpath(marketing_all_fields)
  );
  console.log(submissionPageFields.length);
  for (let index = 1; index <= submissionPageFields.length; index++) {
    let eachFieldTitle = await this.driver.findElement(
      By.xpath(
        "(//div[@class='marketing-form-container']//following::div[contains(@class,'MuiGrid-item')])[" +
          index +
          "]"
      )
    );
    actualToolTipValuesFromPage.push(eachFieldTitle);
    console.log(await eachFieldTitle.getAttribute("title"));
  }
  console.log("From Marketing page: " + actualToolTipValuesFromPage.length);
  return actualToolTipValuesFromPage;
};

Page.prototype.tootlTipMessageDisplayedOnPage = async function() {
  try {
    let submissionPageFields = await this.driver.findElements(
      By.xpath(marketing_all_fields)
    );
    console.log(submissionPageFields.length);
    for (let index = 1; index <= submissionPageFields.length; index++) {
      let eachFieldTitle = await this.driver.findElement(
        By.xpath(
          "(//div[@class='marketing-form-container']//following::div[@class='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12'])[" +
            index +
            "]"
        )
      );
      console.log("Now on: " + (await eachFieldTitle.getAttribute("title")));

      await this.moveMousePointer(eachFieldTitle);
      console.log("After moving....");
      await this.sleep(2000);
      let tootlTipMsg = await this.finByXpath(marketing_field_toolTip);
      await this.elementDisplayed(tootlTipMsg);
    }
  } catch (exception) {
    console.log("Handlled in catch..." + exception);
  }
};
let submissionValues = [];
Page.prototype.processMarketingSubmission = async function() {
  let fieldTextFlag, propertyValue, submissionID;

  try {
    const contract_id = await getData(
      "SL_marketing_react_component",
      "contract_id"
    );
    const terrioteries = await getData(
      "SL_marketing_react_component",
      "territories"
    );
    const properties = await getData(
      "SL_marketing_react_component",
      "property"
    );
    const tireOfDistribution_value = await getData(
      "SL_marketing_react_component",
      "tier_of_distribution"
    );
    const retailer_value = await getData(
      "SL_marketing_react_component",
      "retailer"
    );
    const consumerTarget_value = await getData(
      "SL_marketing_react_component",
      "consumer_target"
    );
    const productDetail_value = await getData(
      "SL_marketing_react_component",
      "product_detail"
    );
    const assetFile_value = await getData(
      "SL_marketing_react_component",
      "assetFile_name"
    );
    const charecter_value = await getData(
      "SL_marketing_react_component",
      "charecters"
    );
    await this.scrollToElement(
      await this.finByCSSLocator(licenseeName_fieldValue)
    );
    //Select licensee field value and validate
    let licensee_fieldText = await this.finByCSSLocator(
      licenseeName_fieldValue
    );
    fieldTextFlag = await licensee_fieldText.getText();

    //Select contract field value
    await this.performclick(await this.finByCSSLocator(contract_field));
    await this.sleep(1500);
    await this.selectValueFromListBox(listBox_values, contract_id);
    await this.pressTabKey(await this.finByXpath(terrioteries_field));
    let contractIDSelected = await this.getTextFromElement(
      await this.finByCSSLocator(contract_field_value)
    );

    console.log("Contract ID selected as: " + contractIDSelected);
    submissionValues.push(contractIDSelected);
    //Select terrioteries field value and validate
    await this.sleep(1000);
    await this.performclick(await this.finByXpath(terrioteries_field));
    await this.sleep(3500);
    await this.selectValueFromListBox(listBox_values, terrioteries);
    await this.sleep(1000);
    await this.genericStepToProceedWithMultiSelect(marketing_page_title);
    let terrioteriesSelected = await this.getTextFromElementBasedonAttribute(
      await this.finByXpath("(//div[@class='territories']//input)[1]"),
      "value"
    );

    console.log("Terrioteries selected as: " + terrioteriesSelected);
    submissionValues.push(terrioteriesSelected);
    //Select Property
    await this.performclick(await this.finByXpath(properties_field));
    await this.sleep(1000);
    await this.selectValueFromListBox(listBox_values, properties);
    await this.sleep(1000);
    await this.genericStepToProceedWithMultiSelect(marketing_page_title);
    let propertySelected = await this.getTextFromElementBasedonAttribute(
      await this.finByXpath("(//div[@class='property']//input)[1]"),
      "value"
    );

    console.log("Property selected as: " + propertySelected);
    submissionValues.push(propertySelected);

    //Select Tire of Distribution
    await this.performclick(await this.finByXpath(tireOfDistribution_field));
    await this.sleep(1500);
    await this.selectValueFromListBox(listBox_values, tireOfDistribution_value);
    await this.genericStepToProceedWithMultiSelect(marketing_page_title);
    let tireOfDistributionSelected = await this.getTextFromElementBasedonAttribute(
      await this.finByXpath("(//div[@id='tierOfDistribution']//input)[1]"),
      "value"
    );

    console.log(
      "Tire Of Distribution selected as: " + tireOfDistributionSelected
    );
    submissionValues.push(tireOfDistributionSelected);
    //Steps for Retailer
    await this.performclick(await this.finByXpath(retailer_field));
    await this.sleep(1500);
    await this.selectValueFromListBox(listBox_values, retailer_value);
    await this.genericStepToProceedWithMultiSelect(marketing_page_title);
    let retailerSelected = await this.getTextFromElementBasedonAttribute(
      await this.finByXpath("(//div[@id='retailer']//input)[1]"),
      "value"
    );

    console.log("Retailer selected as: " + retailerSelected);
    submissionValues.push(retailerSelected);
    //Steps for Consumer Target
    await this.performclick(await this.finByXpath(consumerTarget_field));
    await this.sleep(1500);
    await this.selectValueFromListBox(listBox_values, consumerTarget_value);
    await this.genericStepToProceedWithMultiSelect(marketing_page_title);
    let consumerTargetSelected = await this.getTextFromElementBasedonAttribute(
      await this.finByXpath("(//div[@id='consumerTarget']//input)[1]"),
      "value"
    );

    console.log("Consumer Target selected as: " + consumerTargetSelected);
    submissionValues.push(consumerTargetSelected);
    //Steps for Product Details
    await this.scrollToElement(await this.finByCSSLocator(product_details));
    await this.performclick(await this.finByCSSLocator(product_details));
    await this.sleep(1500);
    await this.selectValueFromListBox(listBox_values, productDetail_value);
    await this.genericStepToProceedWithMultiSelect(marketing_page_title);
    let productDetails = await this.getTextFromElement(
      await this.finByXpath("(//div[@id='select-productDetail']//span)[1]")
    );

    console.log("Product Details selected as: " + productDetails);
    submissionValues.push(productDetails);
    //Steps for Asset File
    await this.performclick(await this.finByXpath(asset_file));
    await this.sleep(1500);
    await this.selectValueFromListBox(listBox_values, assetFile_value);
    await this.genericStepToProceedWithMultiSelect(marketing_page_title);
    let assetFileSelected = await this.getTextFromElement(
      await this.finByXpath("(//div[@id='assetFileName']//span)[2]")
    );

    console.log("Asset file selected as: " + assetFileSelected);
    submissionValues.push(assetFileSelected);
    //Steps for Charecters
    await this.performclick(await this.finByXpath(charecters));
    await this.sleep(1500);
    await this.selectValueFromListBox(listBox_values, charecter_value);
    await this.genericStepToProceedWithMultiSelect(marketing_page_title);
    let charecterSelected = await this.getTextFromElement(
      await this.finByXpath("(//div[@id='characters']//span)[2]")
    );

    console.log("Charecter selected as: " + charecterSelected);
    submissionValues.push(charecterSelected);
    //Upload design file
    await this.performclick(await this.finByCSSLocator(upload_design_button));
    await this.sleep(1500);
    await this.uploadFile(await this.finByCSSLocator("input[type='file']"));
    await this.performclick(await this.finByXpath(submit_designButton));
    await this.elementDisplayed(await this.finByCSSLocator(fileuploaded));
    await this.takeScreenshot("Design uploaded");
    //Submit the job
    await this.performclick(await this.finByCSSLocator(job_submit_button));
    await this.elementDisplayed(await this.finByCSSLocator(jobID));
    submissionID = await this.getTextFromElement(
      await this.finByCSSLocator(jobID)
    );
    console.log("Submission created: " + submissionID);
    await this.takeScreenshot("Submission created");
    console.log("size of submission Array: " + submissionValues.length);
  } catch (exception) {
    console.error(exception);
  }
  return fieldTextFlag;
};

Page.prototype.selectjobFromMenuBarAndLoginToWorkFront = async function() {
  //  await this.performclick(await this.finByXpath(home_button));
  let shadowHost1 = this.finByCSSLocator("nuxeo-app");
  let element1 = await this.findShadowDomElement(shadowHost1, "wbcp-header");
  let element2 = await this.findShadowDomElement(element1, "a[class='jobs']");
  await this.sleep(2000);
  await this.jsClick(element2);
  await this.sleep(12000);
  let element3 = await this.findShadowDomElement(
    shadowHost1,
    "wbcp-jobs-page[name='jobs']"
  );
  console.log("Under Job section");
  let iframe = await this.findShadowDomElement(element3, "iframe[id='iframe']");
  console.log("iframe" + iframe);
  await this.switchToFrameBasedOnTag(iframe);
  await this.write(
    await this.finByCSSLocator(workfront_username),
    WF_licensee_QA_username
  );
  await this.write(
    await this.finByCSSLocator(workfront_password),
    WF_licensee_QA_password
  );
  await this.jsClick(await this.finByXpath(workfront_loginButton));

  await this.takeScreenshot("Logging into WorkFront");
};

const header_lecensee_inbox = workfrontpage_locator.licensee_account_hederMenu;
const licensee_inbox_link_header = workfrontpage_locator.licensee_inbox_link;
const licensee_inbox_grid_data = workfrontpage_locator.lcensee_grid;
const submission_name_licensee_inbox_grid =
  workfrontpage_locator.licensee_sbmissionName_column;
const submission_name_header =
  workfrontpage_locator.licensee_commentDate_header;
Page.prototype.processTheJobInWorkFrontThroughJobSectionAsLicensee = async function() {
  await this.performclick(await this.finByXpath(licensee_inbox_link_header));
  console.log("Trying to get text");
  let job_id_within_text = await this.getTextFromElement(
    await this.finByXpath(submission_name_licensee_inbox_grid)
  );
  console.log(job_id_within_text);
  while (job_id_within_text != "S0195875") {
    await this.jsClick(await this.finByXpath(submission_name_header));
    if (job_id_within_text.includes("Q0004971")) {
      console.log("Submission ID found");
      return;
    }
  }
};

Page.prototype.returnPageValue = async function() {
  console.log("Under return value: " + submissionValues.length);
  for (let i = 0; i < submissionValues.length; i++) {
    console.log(submissionValues[i]);
  }
  let contract = submissionValues[0];
  let terrioteries = submissionValues[1];
  let property = submissionValues[2];
  let tierOfDistribution = submissionValues[3];
  let retailer = submissionValues[4];
  let consumer_target = submissionValues[5];
  let product_detail = submissionValues[6];
  let asset_file = submissionValues[7];
  let charecter = submissionValues[8];
  return {
    contractValue: contract,
    terrioteriesValue: terrioteries,
    propertyValue: property,
    tierOfDistributionValue: tierOfDistribution,
    retailerValue: retailer,
    consumer_targetValue: consumer_target,
    product_detailValue: product_detail,
    asset_fileValue: asset_file,
    charecterValue: charecter
  };
};

module.exports = Page;
