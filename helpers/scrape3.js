var driver = require("./test_web_driver.js").driver,
    By = require("./test_web_driver.js").By;

// USING PROMISES

driver.get('http://localhost:3000/').then(function(){
  driver.findElement(By.partialLinkText('new')).click().then(function(){
    driver.findElement(By.xpath('//button[@type="submit"]')).click().then(function(){
      driver.findElements(By.css("div .alert")).then(function(elements){
        console.log("MESSAGES", elements.length)
        elements.forEach(function(element){
          element.getText().then(function(text){
            console.log("MESSAGE", text)
          })
        })

        driver.quit();
      }) // FIND MESSAGES
    }) // CLICK SUBMIT
  }) // CLICK NEW
}) // GET INDEX
