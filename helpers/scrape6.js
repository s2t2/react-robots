var webdriver = require('selenium-webdriver')
var By = require('selenium-webdriver').By
var driver = new webdriver.Builder().forBrowser('firefox').build();
const BACKSPACE_UNICODE = "\uE003";

console.log("SYNC 1")

driver.get('http://localhost:3000/')
driver.findElement(By.className("btn-edit-robot")).click()
driver.findElement(By.name("robotName")).then(function(element){
  element.clear().then(function(){
    element.sendKeys(" ").then(function(){
      element.sendKeys(BACKSPACE_UNICODE)
    })
  })
})
driver.findElement(By.xpath('//button[@type="submit"]')).click()
driver.findElements(By.css("div .alert-"+"warning"))
  .then(function(elements){
    console.log("MESSAGE COUNT", elements.length)
    elements.forEach(function(element){
      element.getText()
        .then(function(text){
          console.log("MESSAGE TEXT", text)
        })
    })
})

console.log("SYNC 2")

driver.get('http://localhost:3000/')
driver.findElement(By.className("btn-edit-robot")).click()
driver.findElement(By.name("robotDescription")).then(function(element){
  element.clear().then(function(){
    element.sendKeys(" ").then(function(){
      element.sendKeys(BACKSPACE_UNICODE)
    })
  })
})
driver.findElement(By.xpath('//button[@type="submit"]')).click()
driver.findElements(By.css("div .alert-"+"warning"))
  .then(function(elements){
    console.log("MESSAGE COUNT", elements.length)
    elements.forEach(function(element){
      element.getText()
        .then(function(text){
          console.log("MESSAGE TEXT", text)
        })
    })
})

console.log("SYNC 3")

driver
driver.get('http://localhost:3000/')
driver.findElement(By.className("btn-edit-robot")).click()
driver.findElement(By.name("robotName")).then(function(element){
  element.clear().then(function(){
    element.sendKeys(" ").then(function(){
      element.sendKeys(BACKSPACE_UNICODE)
    })
  })
})
driver.findElement(By.name("robotDescription")).then(function(element){
  element.clear().then(function(){
    element.sendKeys(" ").then(function(){
      element.sendKeys(BACKSPACE_UNICODE)
    })
  })
})
driver.findElement(By.xpath('//button[@type="submit"]')).click()
driver.findElements(By.css("div .alert-"+"warning"))
  .then(function(elements){
    console.log("MESSAGE COUNT", elements.length)
    elements.forEach(function(element){
      element.getText()
        .then(function(text){
          console.log("MESSAGE TEXT", text)
        })
    })
})

console.log("SYNC 4")

driver.quit()
