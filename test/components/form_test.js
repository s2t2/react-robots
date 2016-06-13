process.env.NODE_ENV = 'test';

var Browser = require('zombie');
var expect = require('expect');
var http = require('http');

var app = require('../../app.js');

var server;
var browser;

describe("Form", function(){
  before(function() {
    server = http.createServer(app).listen(3003);
    browser = new Browser({ site: 'http://localhost:3003' });
  });

  before(function(done) {
    return browser.visit("/", done()) //this.browser.visit('/robots/new');
  });

  context("when visited", function(){
    it("should contain empty input values", function(){
      console.log(browser.document)
      console.log(browser.document.location.href)
      console.log(browser.document.documentElement)
      //console.log(this.browser.document.documentElement.innerHTML)
      //console.log(this.browser.html() )
      //console.log( this.browser.document.querySelector('head') )

      //console.log(this.browser.document._childNodes[0]._nodeValue)

      //console.log(this.browser.text('body'))

      //this.browser.visit("/", function(error, browser){
      //  if (error) {
      //    console.log(error)
      //  }
      //  //fs.appendFileSync('index.html', browser.html());
      //  //console.log(this.browser.document)
      //  console.log(this.browser.html())
      //})

    })
  })

  context("when filled-out and submitted", function(){
    it("should redirect to index route", function(){

    })
  })

  after(function(done) {
    server.close(done());
  });
})
