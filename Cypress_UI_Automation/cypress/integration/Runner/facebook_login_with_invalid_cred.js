const {search_with_facebook_and_click_on_login_link,enter_unauthorized_username_password_and_login} = require("../../support/Pages/facebook_login_unAuthorized");

describe("To validate un authorized login in facebook", function(){
    before(function(){
        cy.visit("/");
    })
    
    it("Search with facebook keyword and click on the Login link",function(){
        search_with_facebook_and_click_on_login_link();
    })
    it("Validate facebook logo and then enter credentails to the fields",function(){
        enter_unauthorized_username_password_and_login();
    })
    
})