var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By //,
    //until = require('selenium-webdriver').until;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

module.exports = {driver, By}