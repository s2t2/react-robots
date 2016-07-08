var testBrowser = require("../lib/test_web_driver_io.js").testBrowser

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
  .setValue('#robot-name', 'funky chicken bot')
  .getValue('#robot-name').then(function(inputVal){ console.log(inputVal);  })

  .getValue('#robot-description').then(function(inputVal){ console.log(inputVal);  })
  .setValue('#robot-description', 'dances around')
  .getValue('#robot-description').then(function(inputVal){ console.log(inputVal);  })

  //.click("#submit-robot").then(function(){ console.log("SUBMITTING...");  }) // didn't redirect....
  .submitForm("#robots-form").then(function(){ console.log("SUBMITTING...");  })
  .getUrl().then(function(url){  console.log("URL", url);  })

  .end();
