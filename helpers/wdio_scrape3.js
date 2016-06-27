var testBrowser = require("./wdio_helper.js").testBrowser

testBrowser
  .init()
  .url('http://localhost:3000/')
  .getUrl().then(function(url){  console.log("URL", url);  })
  .getTitle().then(function(title) {  console.log("TITLE", title);  })
  .getText("h1 a").then(function(text){  console.log("HEADER", text);  })
  .getText("h2").then(function(text){  console.log("PAGE HEADER", text);  })

  .click(".btn-edit-robot").then(function(){ console.log("EDITING...");  })
  .getUrl().then(function(url){  console.log("URL", url);  })
  .getText("h2").then(function(text){  console.log("PAGE HEADER", text);  })

  .getValue('#robot-name').then(function(inputVal){ console.log(inputVal);  })
  //.setValue('#robot-name', '')
  //.setValue('#robot-name', ['', 'Tab'])
  //.clearElement("#robot-name")
  .setValue('#robot-name', 'test')
  .getValue('#robot-name').then(function(inputVal){ console.log(inputVal);  })

  .getValue('#robot-description').then(function(inputVal){ console.log(inputVal);  })
  //.setValue('#robot-description', '')
  //.setValue('#robot-description', ['', 'Tab'])
  //.clearElement("#robot-description")
  .setValue('#robot-description', 'testtt')
  .getValue('#robot-description').then(function(inputVal){ console.log(inputVal);  })

  .submitForm("#robots-form").then(function(){ console.log("SUBMITTING...");  })
  .getUrl().then(function(url){  console.log("URL", url);  })
  .getHTML(".flash-messages").then(function(html){
    console.log("MESSAGES HTML", html)
  })
  .elements(".alert").then(function(elements){
    console.log("MESSAGE COUNT", elements.value.length)
  })

  .end();
