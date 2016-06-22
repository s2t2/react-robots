process.env.NODE_ENV = 'test';
//var expect = require('expect');
//import {driver, getIndex, clickNew, fillInRobotName, fillInRobotDescription, clickSubmit, findMessages, findPageTitle} from "../../helpers/test_web_driver.js";

describe("Form Submit", function(){
  //this.timeout(15000)

  context("when visited on the 'edit' page", function(){
    context("when submitted with valid revised value(s)", function(){
      [
        {newName: "Cobbler 123"},
        {newName: "Cobbler 123", newDesc: "Makes the shoes."}
      ].forEach(function(revisedValues){
        console.log("REVISED VALUE(S)", revisedValues)
        it("browser should redirect to index");
        it("table row should include revised value(s)"); // revisedValues
      })
    })

    context("when submitted with invalid revised value(s)", function(){
      [
        {newName: ""},
        {newName: "", newDesc: ""}
      ].forEach(function(invalidRevisedValues){
        console.log("REVISED INVALID VALUE(S)", invalidRevisedValues)
        var expectedMessageCount = Object.keys(invalidRevisedValues).length
        console.log("EXPECTED NUMBER OF ERROR MESSAGES", expectedMessageCount)
        it("browser should not redirect away from 'edit' page");
        it("flash should include error message(s)"); // expectedMessageCount
      })
    })
  });
});
