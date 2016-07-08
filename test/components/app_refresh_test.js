var webdriver = require('selenium-webdriver');
var By = require('selenium-webdriver').By;
var expect = require("expect");
import {resetTestDB} from '../../lib/test_db.js';

describe("Pages with non-root urls", function(){
  this.timeout(15000)
  before(function(done){  resetTestDB(done)  })

  context("when refreshed", function(){
    var driver, editPageURL;
    let errorMessage = "Not Found";

    before(function(done){
      driver = new webdriver.Builder().forBrowser('firefox').build();
      driver.get('http://localhost:3000')
        .then(  driver.findElement(By.className("btn-edit-robot")).click()  )
        .then(  driver.getCurrentUrl().then(function(url){  editPageURL = url  })  )
        .then(  driver.navigate().refresh()  )
        .then(done)
    })

    after(function(){  driver.quit();  })

    it("browser should not throw a 404 error", function(){
      return driver.findElement(By.tagName("h1")).then(function(element){
        element.getText().then(function(text){
          console.log("PAGE HEADER", text)
          return expect(text).toNotEqual(errorMessage)
        });
      })
    })
  })
})
