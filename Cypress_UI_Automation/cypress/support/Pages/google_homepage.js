const homePageObjects = require("../page_objects/HomePage_elements")


const logo = homePageObjects.google_logo;
const searchBox = homePageObjects.search_box;
const gmail = homePageObjects.gmail_link;
const image = homePageObjects.image_link;
const search_button = homePageObjects.search_button;

let navigate_google_homePage_and_check_site_logo =  ()=>{
    
    cy.get(logo)
      .scrollIntoView()
}

let visibility_of_searchBox =  ()=>{
    
    cy.get(searchBox).scrollIntoView()
      .should('be.visible')
      .should("have.attr","aria-label","Search")
}

let verify_searchBox_is_editable=()=>{
    cy.get(searchBox)
      .click()
      .type("Random Test")
      .clear()
}

let verify_links_available_on_the_page = ()=>{
        cy.get(gmail)
          .should("contain.text","Gmail")
          .should("have.attr","href","https://mail.google.com/mail/?tab=wm&ogbl")

    cy.get(image)
      .should("contain.text","Images")
      .should("have.attr","href","https://www.google.co.in/imghp?hl=en&tab=wi&ogbl")
}


let check_the_search_button_isDisplayed = ()=>{
  cy.get(search_button)
    .should("be.visible")
}


module.exports={
    navigate_google_homePage_and_check_site_logo,
    visibility_of_searchBox,
    verify_searchBox_is_editable,
    verify_links_available_on_the_page,
    check_the_search_button_isDisplayed
   
}