process.env.NODE_ENV = 'test';
var expect = require('expect');
import {resetTestDB} from '../../helpers/test_db_helper';
import {
  driver, getIndex, clickEdit, findRobotIdParam, reviseFormValues, clickSubmit,
  expectURL, expectTableRowValues, expectFlashMessages
} from "../../helpers/test_web_driver.js";

describe("Form Submit", function(){
  this.timeout(15000)
  before(function(done){  resetTestDB(done)  })
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
          return expectTableRowValues(revisedValues)
        });
      }); // forEach
    }) // context valid values

    context.only("when submitted with invalid revised value(s)", function(){
      var robotId;

      [
        {robotName: ""},
        {robotDescription: ""},
        {robotName: "", robotDescription: ""}
      ].forEach(function(invalidRevisedValues){
        before(function(){
          return getIndex()
            .then(clickEdit)
            .then(findRobotIdParam)
            .then(function(result){  robotId = result  })
            .then(reviseFormValues(invalidRevisedValues))
            .then(clickSubmit)
        })

        it("browser should not redirect away from 'edit' page", function(){
          return expectURL("http://localhost:3000/robots/"+robotId+"/edit")
        });

        it("flash should include error message(s)", function(){
          var expectedMessageCount = Object.keys(invalidRevisedValues).length;
          return expectFlashMessages("warning", expectedMessageCount)
        });
      });
    }); // context invalid values
  }); // context edit page
});
