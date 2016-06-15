process.env.NODE_ENV = 'test';
var expect = require('expect');
var browser = require('../../helpers/test_browser');

describe("Form", function(){
  context("when visited on the 'new' page", function(){
    before(function(){  return browser.visit('/');  });
    before(function(){  return browser.clickLink('new');  });

    it("page should contain a heading", function(){
      expect(browser.query("h2").innerHTML).toEqual("New Robot")
    })

    it("page should contain a form", function(){
      browser.assert.element('form');
    })

    it("form should contain empty input values", function(){
      //console.log(browser.field('robotName'))
    })







    //context("when submitted with invalid values", function(){
    //  //console.log(browser.field('robotName'))
//
//
    //  //before(function(done) {
    //  //  browser
    //  //    .fill('email',    'zombie@underworld.dead')
    //  //    .fill('password', 'eat-the-living')
    //  //    .pressButton('Sign Me Up!', done);
    //  //});
//
    //})
  })
})
