var webdriver = require('selenium-webdriver')
var By = require('selenium-webdriver').By
var until = require('selenium-webdriver').until
var driver = new webdriver.Builder().forBrowser('firefox').build();

const BACKSPACE_UNICODE = "\uE003";

// NAVIGATE TO HOME PAGE

driver.get('http://localhost:3000/');
printURL()

// NAVIGATE TO EDIT PAGE

driver.findElement(By.className("btn-edit-robot")).click();
printURL()


// CLEAR FORM VALUES

printFormValues()
clearFormValues()
printFormValues()

// SUBMIT FORM
driver.findElement(By.xpath('//button[@type="submit"]')).click();
printURL()
printMessages()

//
// HELPER FUNCTIONS
//

function printURL(){
  driver.getCurrentUrl().then(function(url){
    console.log(url);
  })
}

function printFormValues(){
  driver.findElement(By.name('robotName')).getAttribute("value").then(function(inputVal){
    console.log("robotName -- ", inputVal)
  })

  driver.findElement(By.name('robotDescription')).getAttribute("value").then(function(inputVal){
    console.log("robotDesc -- ", inputVal)
  })
}

function clearFormValues(){
  //driver.findElement(By.name('robotName')).sendKeys("")
  driver.findElement(By.name("robotName")).then(function(element){
    element.clear()
    element.sendKeys(" ")
    element.sendKeys(BACKSPACE_UNICODE)
  })

  //driver.findElement(By.name('robotDescription')).sendKeys("");
  driver.findElement(By.name("robotDescription")).then(function(element){
    element.clear().then(function(){
      element.sendKeys(" ").then(function(){
        element.sendKeys(BACKSPACE_UNICODE)
      })
    })
  })
}

function printMessages(){
  driver.findElements(By.css("div .alert"))
    .then(function(messages){
      messages.forEach(function(message){
        message.getText()
          .then(function(messageText){
            console.log("MESSAGE", messageText)
          })
      })
  })
}
