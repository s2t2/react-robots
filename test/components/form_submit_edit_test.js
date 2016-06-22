process.env.NODE_ENV = 'test';
var expect = require('expect');
import {driver, By, getIndex, clickEdit, reviseFormValues, clearFormValues, clickSubmit, expectURL} from "../../helpers/test_web_driver.js";
var db = require("../../db.js");
var recycleRobots = require('../../db/recycle_robots');

describe("Form Submit", function(){
  this.timeout(15000)
  before(function(done){
    recycleRobots()
      .then(function(results){  console.log("RESULTS", results);  })
      .catch(function(err){  console.log("ERROR", err);  })
      .then(function(){
        console.log("DONE");
        db.disconnect().then(done());
      })
  })
  after(function(){  driver.quit(); })

  context("when visited on the 'edit' page", function(){
    context("when submitted with valid revised value(s)", function(){
      [
        {robotName: "CobblerBot 123"},
        {robotName: "CobblerBot 123", robotDescription: "Makes the shoes."}
      ].forEach(function(revisedValues){
        before(function(){
          return getIndex()
            .then(clickEdit)
            .then(reviseFormValues(revisedValues))
            .then(clickSubmit)
        })

        it("browser should redirect to index", function(){
          return expectURL("http://localhost:3000/")
        });

        it("table row should include revised value(s)", function(){
          return driver.findElement(By.css('tbody tr')).then(function(element){
            element.getText().then(function(rowText){
              Object.values(revisedValues).forEach(function(revVal){
                expect(rowText).toInclude(revVal)
              })
            })
          });
        });
      }); // forEach
    }) // context valid values

    context("when submitted with invalid revised value(s)", function(){
      [
        //{robotName: ""},
        {robotName: "", robotDescription: ""}
      ].forEach(function(invalidRevisedValues){
        //var expectedMessageCount = Object.keys(invalidRevisedValues).length;
        //var robotId;

        before(function(){
          return getIndex()
            .then(clickEdit)
            .then(clearFormValues) //.then(reviseFormValues(invalidRevisedValues))
            .then(clickSubmit)
        })

        it("browser should not redirect away from 'edit' page", function(){
          //robotId = "576af2bcf03f61b8c41df829"
          var editPageURL = "http://localhost:3000/robots/123xyz" // +robotId+"/edit"
          //console.log("EDIT PAGE URL", editPageURL)
          return expectURL(editPageURL)
        });

        //it("flash should include error message(s)"); // expectedMessageCount
      });
    }); // context invalid values
  }); // context edit page
});
