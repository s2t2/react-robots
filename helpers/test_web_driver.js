module.exports = {};

// WEB DRIVER INSTANCE

var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

module.exports.driver = driver;

// HELPER FUNCTIONS

module.exports.getIndex = function(){
  return driver.get('http://localhost:3000/');
};

module.exports.clickNew = function(){
  return driver.findElement(By.partialLinkText('new')).click();
};

module.exports.fillInRobotName = function(){
  return driver.findElement(By.name('robotName')).sendKeys("Baker Bot");
};

module.exports.fillInRobotDescription = function(){
  return driver.findElement(By.name('robotDescription')).sendKeys("Makes the cakes.");
};

module.exports.clickSubmit = function(){
  return driver.findElement(By.xpath('//button[@type="submit"]')).click();
};

module.exports.findSiteTitle = function(){
  return driver.getTitle();
}

module.exports.findPageTitle = function(){
  return driver.findElement(By.tagName("h2")).then(function(element){
    return element.getText()
  })
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
