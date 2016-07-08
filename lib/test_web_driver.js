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
// BROWSER ACTIONS
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
  const BACKSPACE_UNICODE = "\uE003";
  Object.keys(revisedValues).forEach(function(attrName){
    driver.findElement(By.name(attrName)).then(function(element){
      if (revisedValues[attrName]) {
        //console.log("PRESSING KEYS")
        element.clear().then(function(){
          return element.sendKeys(revisedValues[attrName])
        })
      } else if (revisedValues[attrName] == ""){
        //
        // ... workaround to trigger input element's onChange event, because sending a blank string with sendKeys does not trigger input element's onChange event
        //
        //console.log("PRESSING BACKSPACE")
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


module.exports.quitBrowser = function(){
  return driver.quit();
};

//
// HELPER FUNCTIONS
//

module.exports.findRobotIdParam = function(){
  return driver.getCurrentUrl().then(function(url){
    console.log("FINDING ROBOT ID FROM URL", url)
    var robotId = url.split("/robots/")[1].split("/edit")[0] // should turn "http://localhost:3000/robots/57741a923cd29410fd8d9d56/edit" into "57741a923cd29410fd8d9d56"
    return robotId
  })
}

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

var findMessages = function(messageType){
  return driver.findElements(By.css("div .alert-"+messageType));
};
module.exports.findMessages = findMessages;

var logMessages = function(elements){
  elements.forEach(function(element){
    element.getText()
      .then(function(text){
        console.log("MESSAGE", text)
      })
      .catch(function(err){
        console.log("ERR", err)
      })
  })
};
module.exports.logMessages = logMessages


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

module.exports.expectURLToInclude = function(str){
  return driver.getCurrentUrl().then(function(url){
    console.log("CURRENT URL", url);
    expect(url).toInclude(str)
  })
}

// Expect values to appear in the table's first row.
// @params [Object] expectedValues
// @example expectTableRowValues({robotName: "CobblerBot 123"})
// @example expectTableRowValues({robotName: "CobblerBot 123", robotDescription: "Makes the shoes."})
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

// Expect a given number of flash messages of a given type.
// @params [String] messageType The bootstrap class of expected message(s) (e.g. "success","danger","warning", etc.)
// @params [Integer] messageCount The number of expected message(s).
module.exports.expectFlashMessages = function(messageType, messageCount){
  return driver.findElements(By.css("div .alert-"+messageType)).then(function(elements){
  //return findMessages(messageType).then(function(elements){
    //console.log(elements)
    console.log("FOUND MESSAGES", elements.length)
    logMessages(elements)
    expect(elements.length).toEqual(messageCount)
  })
};
