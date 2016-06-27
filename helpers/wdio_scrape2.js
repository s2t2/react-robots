var testBrowser = require("./wdio_helper.js").testBrowser

testBrowser
  .init()
  .url('http://localhost:3000/')
  .getTitle().then(function(title) {
    console.log('TITLE' + title);
  })
  .getText("h1 a").then(function(text){
    console.log("HEADER", text)
  })
  .getText("h2").then(function(text){
    console.log("PAGE HEADER", text)
  })
  .click(".btn-edit-robot")
  .getText("h2").then(function(text){
    console.log("PAGE HEADER", text)
  })
  .end();
