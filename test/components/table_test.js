process.env.NODE_ENV = 'test';
var expect = require('expect');
var browser = require('../../helpers/test_browser');

describe("Table", function(){
  context("when visited on the 'index' page", function(){
    before(function(){  return browser.visit('/');  });

    it("should contain a page heading", function(){
      expect(browser.query("h2").innerHTML).toEqual("Robots")
    })

    it("should contain a table of robot rows", function(){
      browser.assert.element('table');
    })
  })
})
