process.env.NODE_ENV = 'test';
var browser = require('../../helpers/test_browser');

describe("App", function(){
  context("when visited", function(){
    before(function(){  return browser.visit('/');  }); // todo: run all these assertions against all pages to demonstrate layout consistency

    it("should load with success", function(){
      browser.assert.success();
    })

    it("should contain a site title", function(){
      browser.assert.text('title', 'Robots App!');
    })
  })
})
