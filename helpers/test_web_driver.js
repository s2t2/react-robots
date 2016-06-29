module.exports = {};

// WEB DRIVER INSTANCE AND BUILT-IN UTILITY METHODS

var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

module.exports.driver = driver;
module.exports.By = By;

//
// HELPER FUNCTIONS
//

module.exports.getIndex = function(){
  return driver.get('http://localhost:3000/');
};

module.exports.clickNew = function(){
  return driver.findElement(By.partialLinkText('new')).click();
};

module.exports.clickEdit = function(){
  return driver.findElement(By.className("btn-edit-robot")).click();
};

module.exports.fillInRobotName = function(){
  return driver.findElement(By.name('robotName')).sendKeys("Baker Bot");
};

module.exports.fillInRobotDescription = function(){
  return driver.findElement(By.name('robotDescription')).sendKeys("Makes the cakes.");
};

module.exports.clearFormValues = function(){
  ["robotName","robotDescription"].forEach(function(attrName){
    driver.findElement(By.name(attrName)).then(function(element){
      return element.clear()
    })
  })
};

// Revise Form Values
// @params [Object] revisedValues Object key names must match respective form input "name" values.
// @example reviseFormValues({robotName: "CobblerBot 123"})
// @example reviseFormValues({robotName: "CobblerBot 123", robotDescription: "Makes the shoes."})
// @example reviseFormValues({robotName: ""})
// @example reviseFormValues({robotName: "", robotDescription: ""})
module.exports.reviseFormValues = function(revisedValues){
  Object.keys(revisedValues).forEach(function(attrName){
    driver.findElement(By.name(attrName)).then(function(element){
      if (revisedValues[attrName]) {
        //console.log("PRESSING KEYS")
        element.clear().then(function(){
          return element.sendKeys(revisedValues[attrName])
        })
      } else {
        //console.log("PRESSING BACKSPACE") // ... this is a workaround to trigger respective input element's onChange event if incoming value is a blank string, because sending a blank string with webdriver's sendKeys method does not produce the desired affect
        const BACKSPACE_UNICODE = "\uE003";
        element.clear().then(function(){
          element.sendKeys(" ").then(function(){
            return element.sendKeys(BACKSPACE_UNICODE)
          })
        })
      } // if blank string
    })
  })
};

module.exports.clickSubmit = function(){
  return driver.findElement(By.xpath('//button[@type="submit"]')).click();
};

module.exports.findSiteTitle = function(){
  return driver.getTitle();
}

module.exports.findPageTitle = function(){
  return driver.findElement(By.tagName("h2")).then(function(element){
    return element.getText();
  })
};

module.exports.findRobotName = function(){
  return driver.findElement(By.name('robotName')).getAttribute("value");
};

module.exports.findMessages = function(messageType){
  return driver.findElements(By.css("div .alert-"+messageType));
};

module.exports.logMessages = function(elements){
  elements.forEach(function(element){
    element.getText().then(function(text){
      console.log("MESSAGE", text)
    })
  })
};

//
// EXPECTATIONS / ASSERTIONS
//

var expect = require('expect');

module.exports.expectURL = function(expectedURL){
  return driver.getCurrentUrl().then(function(url){
    console.log("CURRENT URL", url);
    expect(url).toEqual(expectedURL)
  })
}

module.exports.expectTableRowValues = function (expectedValues) {
  console.log("EXPECT TABLE ROW VALUES")
  return driver.findElement(By.css('tbody tr')).then(function(element){
    element.getText().then(function(rowText){
      Object.values(expectedValues).forEach(function(expectedVal){
        expect(rowText).toInclude(expectedVal)
      })
    })
  });
};
