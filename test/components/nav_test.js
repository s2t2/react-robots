//process.env.NODE_ENV = 'test';
//var expect = require('expect');
//var browser = require('../../lib/test_browser.js');
//
//describe("Nav", function(){
//  before(function(){  return browser.visit('/');  }); // todo: run all these assertions against all pages to demonstrate layout consistency
//
//  it("should contain a link to the homepage", function(){
//    browser.assert.link('h1 a', 'Robots App!', '/');
//  })
//
//  it("should contain a link to the 'new' page", function(){
//    browser.assert.link('a', 'new', '/robots/new');
//  })
//
//  it("should contain a 'recycle' button", function(){
//    var button = browser.query(".btn-success") // or... browser.button("recycle")
//    expect(button.textContent.trim()).toEqual("recycle")
//  })
//})
