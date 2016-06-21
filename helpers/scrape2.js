var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();



// INDEX

driver.get('http://localhost:3000/')

driver.getTitle().then(function(result){
  console.log("SITE TITLE", result)
})

driver.findElement(By.tagName("h2")).then(function(element){
  element.getText().then(function(text){
    console.log("PAGE HEADER", text)
  });
})



// NEW

driver.findElement(By.partialLinkText('new')).click()

driver.getCurrentUrl().then(function(url){
  console.log("VISITED", url)
})

driver.getTitle().then(function(result){
  console.log("SITE TITLE", result)
})

driver.findElement(By.tagName("h2")).then(function(element){
  element.getText().then(function(text){
    console.log("PAGE HEADER", text)
  });
})



// FILL-IN FORM

driver.findElement(By.name('robotName')).sendKeys("Baker Bot");

// SUBMIT FORM

driver.findElement(By.xpath('//button[@type="submit"]')).click()

driver.getTitle().then(function(result){
  console.log("SITE TITLE", result)
})

driver.findElement(By.tagName("h2")).then(function(element){
  element.getText().then(function(text){
    console.log("PAGE HEADER", text)
  });
})


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
