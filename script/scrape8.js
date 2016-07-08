var expect = require("expect");
var webdriver = require('selenium-webdriver');
var By = require('selenium-webdriver').By

//const INPUT_NAMES = ["robotName","robotDescription"];

var testDriver = new webdriver.Builder().forBrowser('firefox').build();

visitHomePage(testDriver)
  .then(visitEditPage(testDriver))
  .then(clearInput("robotName", testDriver))
  .then(clearInput("robotDescription", testDriver))
  .then(clickSubmit(testDriver))
  //.then(
  //  countWarningMessages(testDriver)
  //    .then(function(messageCount){
  //      console.log("MESSAGE COUNT", messageCount);
  //      expect(messageCount).toEqual(2)
  //    })
  //)
  .then(expectWarningMessages(2, testDriver))
  .catch(function(err){  console.log("CATCH", err)  })
  .then(  testDriver.quit()  )


//
// ////////////////
//

const BACKSPACE_UNICODE = "\uE003";

function visitHomePage(driver){
  return driver.get('http://localhost:3000/')
};

function visitEditPage(driver){
  return driver.findElement(By.className("btn-edit-robot")).click()
};

function clearInput(inputName, driver){
  return driver.findElement(By.name(inputName))
    .then(function(element){
      element.clear()
        .then(function(){
          element.sendKeys(" ")
            .then(function(){
              element.sendKeys(BACKSPACE_UNICODE)
          })
        })
    })
};

function clickSubmit(driver){
  return driver.findElement(By.xpath('//button[@type="submit"]')).click()
};

function countWarningMessages(driver){
  return driver.findElements(By.css("div .alert-"+"warning"))
    .then(function(elements){
      console.log("MESSAGE COUNT", elements.length)
      return Promise.resolve(elements.length);
      //elements.forEach(function(element){
      //  element.getText()
      //    .then(function(text){
      //      console.log("MESSAGE TEXT", text)
      //    })
      //})
    })
}

function expectWarningMessages(expectedMessageCount, driver){
  return driver.findElements(By.css("div .alert-"+"warning"))
    .then(function(elements){
      console.log("MESSAGE COUNT", elements.length)
      expect(elements.length).toEqual(expectedMessageCount)
    })

}
