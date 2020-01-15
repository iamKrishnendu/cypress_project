const { Builder, By, until, Key } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
var remote = require("selenium-webdriver/remote");
const { createDirectory } = require("../utils/genericUtility");
const screenshotFolder = createDirectory();
const path = require("path");

const fs = require("fs");

let options = new chrome.Options();
options.addArguments("disable-infobars");
options.addArguments("--start-maximized");
options.addArguments("--incognito");

var Page = function() {
  this.driver = new Builder()
    .setChromeOptions(options)
    .forBrowser("chrome")
    .build();

  this.visit = async function(theUrl) {
    return await this.driver.get(theUrl);
  };
  this.quit = async function() {
    return await this.driver.quit();
  };

  // wait and find a specific element with it's ID
  this.findById = async function(id) {
    await this.driver.wait(
      until.elementLocated(By.id(id)),
      15000,
      "Looking for element"
    );
    return await this.driver.findElement(By.id(id));
  };

  // wait and find a specific element with it's name
  this.findByName = async function(name) {
    await this.driver.wait(
      until.elementLocated(By.name(name)),
      15000,
      "Looking for element"
    );
    return await this.driver.findElement(By.name(name));
  };
  // wait and find a specific element with it's xpath
  this.finByXpath = async function(xpath) {
    await this.driver.wait(
      until.elementLocated(By.xpath(xpath)),
      30000,
      "Looking for element"
    );
    return await this.driver.findElement(By.xpath(xpath));
  };

  // wait and find a specific element with it's CSS
  this.finByCSSLocator = async function(css) {
    await this.driver.wait(
      until.elementLocated(By.css(css)),
      30000,
      "Looking for element"
    );
    return await this.driver.findElement(By.css(css));
  };

  //wait and find specific element with it's tagname
  this.findByTagName = async function(tagname) {
    await this.driver.wait(
      until.elementLocated(By.tagName(tagname)),
      30000,
      "Looking for element " + tagname
    );
    return await this.driver.findElement(By.tagName(tagname));
  };
  // fill input web elements
  this.write = async function(el, txt) {
    return await el.sendKeys(txt);
  };
  //Click operation
  this.performclick = async function(el) {
    el.click();
  };
  //Hard wait
  this.sleep = async function(time) {
    await this.driver.sleep(time);
  };
  // PageLoad timeout
  this.awaitToLoadElement = async function(el) {
    await this.driver.wait(
      until.elementLocated(el),
      60000,
      "Looking for element" + el
    );
  };
  this.switchToFrameBasedOnTag = async function(frameTag) {
    await this.driver.switchTo().frame(frameTag);
  };
  //To take screenshot call this function along with filename
  this.takeScreenshot = async function(filename) {
    console.log("Screenshot folder path: " + screenshotFolder);
    let image = await this.driver.takeScreenshot();
    let screenshotPath = screenshotFolder + "/" + filename + ".png";
    fs.writeFileSync(screenshotPath, image, "base64", function(err) {
      if (err) console.log("Execption occured during saving screenshot " + err);
      console.log("Screenshot taken with the reference: " + filename);
    });
    return screenshotPath;
  };
  //To get Text from an web element call this function with element as an argument
  this.getTextFromElement = async function(element) {
    let textFromElement;
    try {
      textFromElement = element.getText();
    } catch (exception) {
      console.error(exception);
    }
    return textFromElement;
  };
  //To get attribute value of an element call this function along with element and required attribute as an argument
  this.getTextFromElementBasedonAttribute = async function(element, attrib) {
    let textFromElement;
    try {
      textFromElement = element.getAttribute(attrib);
    } catch (exception) {
      console.error(exception);
    }
    return textFromElement;
  };
  //To perform mouse pointer move action and click use this function with an element
  this.movemousePointerAndClick = async function(element) {
    const actions = await this.driver.actions();
    await actions
      .move({ origin: element })
      .click()
      .perform();
  };
  //To perform keyboard Tab key use this function
  this.pressTabKey = async function(element) {
    try {
      element.sendKeys(Key.TAB);
    } catch (exception) {
      throw new Error(exception);
    }
  };
  //To press Esc button use this function
  this.pressEscape = async function(element) {
    try {
      element.sendKeys(Key.ESCAPE);
    } catch (exception) {
      throw new Error(exception);
    }
  };
  //Only move the mouse pointer use this function along with element as an element
  this.moveMousePointer = async function(element) {
    const actions = await this.driver.actions();
    await actions.move({ origin: element }).perform();
  };
  this.moveMousePointerAndClick = async function(element) {
    const actions = await this.driver.actions();
    await actions
      .move({ origin: element })
      .click()
      .perform();
  };
  // To accomplish upload file operation use this function. Element should be pass as an argument
  this.uploadFile = async function(element) {
    filePath = path.join(__dirname, "../design/batmanLogo.jpg");
    await this.driver.setFileDetector(new remote.FileDetector());
    await element.sendKeys(filePath);
  };
  //To perform scroll operation use this function
  this.scrollToElement = async function(element) {
    await this.driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      element
    );
  };
  //To use JS click operation use this function. An element should pass as an argument
  this.jsClick = async function(element) {
    await this.driver.executeScript("arguments[0].click();", element);
  };
  //To get ShadowRoot from DOM use this function. One Root element has to be pass as an argument
  this.getExtShadowRoot = async function(shadowHostRoot) {
    let shadowHost;
    await (shadowHost = shadowHostRoot);
    return this.driver.executeScript(
      "return arguments[0].shadowRoot",
      shadowHost
    );
  };
  //To expand ShadowRoot until required locator call this function. ShadowRoot and Required element should be the arguments
  this.findShadowDomElement = async function(shadowHostRoot, shadowDomElement) {
    let shadowRoot;
    let element;

    await (shadowRoot = this.getExtShadowRoot(shadowHostRoot));

    await shadowRoot.then(async result => {
      console.log("under than ShadowDom element: " + shadowDomElement);
      await (element = result.findElement(By.css(shadowDomElement)));
    });

    return element;
  };
  //To compare some text from element to actual text. Call this function
  this.verifyText = async function(element, textOnElement) {
    let verifyTextFlag = true;
    let actualText = element.getText();
    if (actualText.includes(textOnElement)) {
      console.log("Text from element: " + actualText);
      return verifyTextFlag;
    }

    return (verifyTextFlag = false);
  };
  //To validate required element is displayed or not call this function
  this.elementDisplayed = async function(element) {
    let displayedFlag = true;

    if (element.isDisplayed()) {
      return displayedFlag;
    }
    return (displayedFlag = false);
  };
  //This is a generic steps. Application specific
  this.genericStepToProceedWithMultiSelect = async function(locator) {
    try {
      await this.sleep(1000);
      await this.scrollToElement(await this.finByXpath(locator));
      await this.sleep(2000);
      await this.moveMousePointerAndClick(await this.finByXpath(locator));
    } catch (exception) {
      console.error(exception);
    }
  };
  //To select value from listbox call this function. Application specific
  this.selectValueFromListBox = async function(element, value) {
    try {
      let listOfOptions = await this.driver.findElements(By.xpath(element));
      console.log("Length of element: " + listOfOptions.length);
      for (let index = 1; index <= listOfOptions.length; index++) {
        let optionFromPage = await this.driver.findElement(
          By.xpath("(//ul[@role='listbox']/li)[" + index + "]")
        );
        console.log(await optionFromPage.getAttribute("data-value"));
        if ((await optionFromPage.getAttribute("data-value")) === value) {
          console.log(
            "Matched found for: " +
              (await optionFromPage.getAttribute("data-value"))
          );
          await this.scrollToElement(optionFromPage);
          await this.performclick(optionFromPage);
          await this.sleep(1000);

          return;
        }
      }
    } catch (exception) {
      console.error(exception);
    }
  };
};

module.exports = Page;
