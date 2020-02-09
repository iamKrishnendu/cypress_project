# Automated Testing with Cypress

Introduction with Cypress:  Cypress is a front end or UI testing tool. It can be used in all major browsers like chrome, edge, Firefox, electron etc. Cypress majorly supports JavaScript for automates test script design. The support of chai assertion libraries and Mocha framework is in built with cypress. Cypress has it’s own test runner which is very useful for test execution and debugging but apart from that user can control the execution from CLI as well.

For more details on cypress setup and it’s features please go through the below documentation link.
https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell


#Agenda:   In this article I will explain an automated test procedure in google search homepage with cypress and it’s features.
#Test Flow:     
The project contains two test files. The base site URL where we will perform execution is https://www.google.com
	

i.	facebook_login_with_invalid_cred.js   Negative test to demonstrate the failed step analysis
ii.	Google_homePage_spec.js  Positive test 
	
#Test Flow Explanation: 
1.	The first Test will open google.com homepage and search for the keyword ‘facebook’ and click on search button, once results will appear then script till try to click on signIN link from the result (This particular step will fail)
2.	The second test will landing on google.com homepage, then it will verify various components available on the page like: google logo on the page, searchbox, gmail and images link on the page.

#Project Folder Structure:

├── ...                   #Project Root
│
├── cypress               #cypress folder created by default by Cypress
│   ├── fixtures          # Contains test data files
│   |    |-data. json     # External test data source 
|
│   ├──integration        # Contains spec or test runner files
│   |     |- Runner
|   |         |--facebook_login_with_invalid_cred.js
|   |         |--Google_homePage_spec.js
|   |
|   ├──plugins            #Contains supportive js file
|   |     |- index.js
|   |
|   ├──screenshots        #Contains failed test step by default
|   |
|   ├──supports	
|   |    |- Page_objects # Contains page elements or locators
|   |    |      |- facebook_page_elements.js
|   |    |      |-HomePage_elements.js
|   |    |
|   |    |- Pages                   # Contains files for business flow and logic
|   |         |-facebook_login_unAuthorized.js
|   |         |-google_homepage.js
|   |     
|   ├──videos	                   #Contains step navigation vide file if enabled
|   ├──mochawesome-report          #Contains test reports             
│          
│
│
├── cypress.json                  #Contains CLI commands and npm options    
├── package.json                  #Contains all dependencies
├── ...


