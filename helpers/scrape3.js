var driver = require("./test_web_driver.js").driver,
    By = require("./test_web_driver.js").By;

// INDEX

driver.get('http://localhost:3000/')

// NEW

driver.findElement(By.partialLinkText('new')).click()


// SUBMIT

driver.findElement(By.xpath('//button[@type="submit"]')).click()

// FLASH MESSAGES

driver.findElements(By.css("div .alert")).then(function(elements){
  console.log("MESSAGES", elements.length)

  elements.forEach(function(element){
    element.getText().then(function(text){
      console.log("MESSAGE", text)
    });
  })

})

//driver.wait(until.titleIs('webdriver - Google Search'), 1500);

driver.quit();
