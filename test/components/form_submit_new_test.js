process.env.NODE_ENV = 'test';
var expect = require('expect');
import {driver, getIndex, clickNew, fillInRobotName, fillInRobotDescription, clickSubmit, findMessages, findPageTitle, findRobotName} from "../../helpers/test_web_driver.js";

describe("Form Submit", function(){
  this.timeout(15000)

  context("when visited on the 'new' page", function(){
    beforeEach(function(){  return getIndex().then(clickNew);  });
    after(function(){  driver.quit(); })

    context("when submitted with invalid values", function(){
      beforeEach(function(){  return clickSubmit();  });

      it("flash should include error messages", function(){
        return findMessages("warning").then(function(elements){
          console.log("WARNING MESSAGES", elements.length)
          expect(elements.length).toEqual(2)
        })
      })
    })

    context("when submitted with an invalid value", function(){
      beforeEach(function(){  return fillInRobotName().then(clickSubmit);  });

      it("flash should include one error message", function(){
        return findMessages("warning").then(function(elements){
          console.log("WARNING MESSAGES", elements.length)
          expect(elements.length).toEqual(1)
        })
      })

      it("form value should be passed back", function(){
        return findRobotName().then(function(botName){
          console.log("PASSED-BACK FORM VALUE", botName)
          expect(botName).toEqual("Baker Bot")
        })
      })
    })

    context("when submitted with valid values", function(){
      beforeEach(function(){  return fillInRobotName().then(fillInRobotDescription).then(clickSubmit);  }) //todo: this test is executing after the preceding test and double-filling-in the name input. need to isolate each test from the rest.

      it("app should redirect to the index page", function(){
        //return findPageTitle().then(function(pageTitle){
        //  expect(pageTitle).toEqual("Robots")
        //})
        return driver.getCurrentUrl().then(function(url){
          console.log("REDIRECTED TO", url);
          expect(url).toEqual("http://localhost:3000/")
        })
      })

      it("flash should include a success message", function(){
        return findMessages("success").then(function(elements){
          console.log("SUCCESS MESSAGES", elements.length)
          expect(elements.length).toEqual(1)
        })
      })
    })
  })
});
