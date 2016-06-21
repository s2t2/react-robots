var driver = require("./test_web_driver.js").driver,
    By = require("./test_web_driver.js").By;

// USING PROMISES WITH NAMED FUNCTIONS

function getIndex(){
  return driver.get('http://localhost:3000/');
}

function clickNewPageButton(){
  return driver.findElement(By.partialLinkText('new')).click();
}

function clickSubmitButton(){
  return driver.findElement(By.xpath('//button[@type="submit"]')).click();
}

function findMessages(){
  return driver.findElements(By.css("div .alert"));
}

function logMessages(elements){
  elements.forEach(function(element){
    element.getText().then(function(text){
      console.log("MESSAGE", text)
    })
  })
}

getIndex().then(function(){
  clickNewPageButton().then(function(){
    clickSubmitButton().then(function(){
      findMessages().then(function(elements){
        console.log("MESSAGES", elements.length)
        logMessages(elements)
        driver.quit();
      }) // FIND MESSAGES
    }) // CLICK SUBMIT
  }) // CLICK NEW
}) // GET INDEX
