

const {navigate_google_homePage_and_check_site_logo,visibility_of_searchBox,verify_searchBox_is_editable,
    verify_links_available_on_the_page,check_the_search_button_isDisplayed} = require("../../support/Pages/google_homepage");

describe("To validate the Home page components of Google",function(){
    before(function(){
        cy.visit("/");
    })
    it("User should landing on Google home page", function(){
        navigate_google_homePage_and_check_site_logo();

    })
    it("Search box should be visible on the page", function(){
        visibility_of_searchBox();
    })
    it("Searchbo should be editable",function(){
        verify_searchBox_is_editable();
    })
    it("Gmail and Image links should be available on the page", function(){
        verify_links_available_on_the_page();
        
    })
    it("Google search button should be present on the screen",function(){
        check_the_search_button_isDisplayed();
    })
    
    after(function(){
        console.log('Execution is completed')
    })
})


