process.env.NODE_ENV = 'test';
var webdriver = require('selenium-webdriver');
var By = require('selenium-webdriver').By;
var expect = require("expect");
import {resetTestDB} from '../../helpers/test_db_helper';

describe("Table", function(){
  this.timeout(15000)
  var wd;

  before(function(done){
    wd = new webdriver.Builder().forBrowser('firefox').build();
    resetTestDB(done);
  });

  context("when visited on the 'index' page", function(){
    before(function(){
      return wd.get('http://localhost:3000');
    });

    context("when a record is deleted off-page by some other user or process", function(){
      before(function(){
        return wd.findElement(By.className("btn-delete-robot")).click();
      });

      it("should update without a page refresh", function(){
        return wd.findElements(By.css('tbody tr')).then(function(elements){
          console.log("ROW COUNT", elements.length)
          expect(elements.length).toEqual(3)
        });
      });
    });
  });
});
