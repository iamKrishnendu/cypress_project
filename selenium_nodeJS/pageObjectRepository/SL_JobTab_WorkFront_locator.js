module.exports = {
  homeButton: "//button/span[text()='Home']",
  workfront_username: "input[name='username']",
  workfront_password: "input[id='password']",
  workfront_loginButton:
    "//button[@type='submit' and contains(text(),'Log In')]",
  searchBox: "input[name='query']",
  showAll_panel_on_search: "li[data-value='showAll']",
  list_of_jobs: "div[class='search-result-single ng-scope'] a em",
  licensee_account_hederMenu: "(//div[@id='content-requests']//ul)[1]",
  licensee_inbox_link:
    "(//div[@id='content-requests']//ul)[1]//a[text()='Licensee Inbox']",
  lcensee_grid:
    "//a[text()='Licensee Inbox']/following::div[@aria-label='grid']",
  licensee_sbmissionName_column: "(//div[@aria-label='grid']//following::a)[4]",
  licensee_commentDate_header: "//div[text()='Comment Date']"
};
