process.env.NODE_ENV = 'test';
var expect = require('expect');

import {resetTestDB} from '../../helpers/test_db_helper';

import {getIndex, clickEdit, reviseFormValues, clickSubmit, expectURL, expectTableRowValues} from "../../helpers/wdio_helper.js";

describe("Form Submit", function(){
  this.timeout(15000)
  before(function(done){  resetTestDB(done)  })

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

    context("when submitted with invalid revised value(s)", function(){
      [
        {robotName: ""},
        {robotDescription: ""},
        {robotName: "", robotDescription: ""}
      ].forEach(function(invalidRevisedValues){
        before(function(){
          return getIndex()
            .then(clickEdit)
            .then(reviseFormValues(invalidRevisedValues))
            .then(clickSubmit)
        })

        it("browser should not redirect away from 'edit' page", function(){
          var robotId = "123xyz"
          return expectURL("http://localhost:3000/robots/"+robotId+"/edit")
        });

        //var expectedMessageCount = Object.keys(invalidRevisedValues).length;
        //it("flash should include error message(s)"); // expectedMessageCount
      });
    }); // context invalid values
  }); // context edit page
});
