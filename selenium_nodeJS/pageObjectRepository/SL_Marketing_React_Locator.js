module.exports = {
  marketing_job_option: "a[href='/submit/marketing']",
  marketing_page_title:
    "//div[@class='marketing-form-container']//*[text()='Marketing']",
  marketing_all_fields:
    "//div[@class='marketing-form-container']//following::div[contains(@class,'MuiGrid-item')]",
  marketing_field_toolTip: "//div[contains(@aria-describedby,'mui-tooltip')]",
  licenseeName_field: "div[id='select-licensee-name']",
  licenseeName_fieldValue: "div[id='select-licensee-name'] span",
  listBox_values: "//ul[@role='listbox']/li",
  contract_field: "div[id='select-contract']",
  contract_field_value: "div[id='select-contract'] span",
  terrioteries_field: "//div[@class='territories']/div[1]",
  properties_field: "//div[@class='property']/div[1]",
  tireOfDistribution_field: "//div[@id='tierOfDistribution']/div[1]",
  retailer_field: "//div[@id='retailer']/div[1]",
  consumerTarget_field: "//div[@id='consumerTarget']/div[1]",
  marketingChannel_field: "//div[@id='marketingChannel']/div[1]",
  marketing_start_date:
    "//label[contains(text(),'Marketing Start Date')]/following::div[1]",
  marketing_end_date:
    "//label[contains(text(),'Marketing End Date')]/following::div[1]",
  date_value:
    "//div[@class='MuiPickersBasePicker-pickerView']//following::button[not(contains(@class,'MuiPickersDay-hidden'))]//p",
  upload_design_button: "div[id='desing-file'] button",
  file_destination: "//h2[text()='Upload file']/following::div",
  submit_designButton: "(//span[text()='Submit'])[2]",
  fileuploaded: "div[class='file-uploaded']",
  job_submit_button: "button[Value='Submit']",
  jobID: "h5[class='sucess-jobid']",
  product_details: "div[id='select-productDetail']",
  asset_file: "//div[@id='assetFileName']/div[1]",
  charecters: "//div[@id='characters']/div[1]"
};
