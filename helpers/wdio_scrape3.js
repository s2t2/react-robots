var testBrowser = require("./wdio_helper.js").testBrowser

const BACKSPACE_UNICODE = "\uE003";

testBrowser
  .init()
  .url('http://localhost:3000/')
  .click(".btn-edit-robot")

  .setValue('#robot-name', [' ', BACKSPACE_UNICODE])
  .setValue('#robot-description', [' ', BACKSPACE_UNICODE])
  .submitForm("#robots-form").then(function(){
    console.log("SUBMITTING...");
  })
  .getUrl().then(function(url){
    console.log("URL", url);
  })
  .elements(".alert").then(function(elements){
    console.log("MESSAGE COUNT", elements.value.length)
  })

  .end();
