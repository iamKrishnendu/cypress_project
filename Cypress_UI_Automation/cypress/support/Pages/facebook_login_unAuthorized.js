const facebookPageObj = require("../page_objects/facebook_page_elements");
const homePageObjects = require("../page_objects/HomePage_elements")

const facebook_link = facebookPageObj.search_result_fb;
const facebook_logo = facebookPageObj.fab_logo;
const username = facebookPageObj.email;
const password = facebookPageObj.password;
const image = homePageObjects.image_link;
const searchBox = homePageObjects.search_box;
const logo = homePageObjects.google_logo;
const search_button = homePageObjects.search_button;


let search_with_facebook_and_click_on_login_link = ()=>{
    
   cy.fixture('data.json').then((item)=>{
     console.log(item.name);
     cy.get(searchBox)
   .click()
   .type(item.keyword)
   cy.get(logo).click('topLeft')
   cy.wait(1000)
   cy.get(search_button)
   .click()
  cy.get(facebook_link)
    
    .click()
   })  
}

let enter_unauthorized_username_password_and_login = ()=>{
  cy.fixture('data.json').then((item)=>{
      cy.get(facebook_logo)
        .should("be.visible")
      cy.get(username)
        .should("be.visible")  
      cy.get(password)
        .should("be.visible")  
  })
}

module.exports={
  search_with_facebook_and_click_on_login_link,
  enter_unauthorized_username_password_and_login
}