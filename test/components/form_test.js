process.env.NODE_ENV = 'test';
var expect = require('expect');
var browser = require('../../helpers/test_browser');

describe("Form", function(){

  //
  // NEW PAGE
  //

  context("when visited on the 'new' page", function(){
    before(function(){  return browser.visit('/');  });
    before(function(){  return browser.clickLink('new');  });

    it("page should contain a heading", function(){
      expect(browser.query("h2").innerHTML).toEqual("New Robot")
    })

    it("page should contain a form", function(){
      browser.assert.element('form');
    })

    //it("form values should be blank", function(){
    //  console.log(browser.field('robotName'))
    //})

    //context("when submitted with invalid values", function(){
    //  //console.log(browser.field('robotName'))
    //  //before(function(done) {
    //  //  browser
    //  //    .fill('email',    'zombie@underworld.dead')
    //  //    .fill('password', 'eat-the-living')
    //  //    .pressButton('Sign Me Up!', done);
    //  //});
    //})
  })

  //
  // EDIT PAGE
  //

  context("when visited on the 'edit' page", function(){
    before(function(){  return browser.visit('/');  });
    before(function(){  return browser.pressButton('edit');  });

    it("page should contain a heading", function(){
      var robotId = browser.location._url.split("robots/")[1].split("/")[0];
      expect(browser.query("h2").innerHTML).toEqual("Edit Robot #"+robotId);
    });

    //it("form values should be robot attributes", function(){
    //  var rows = browser.queryAll("tbody tr");
    //  expect(rows.length).toEqual(1)
    //});
  });
});
