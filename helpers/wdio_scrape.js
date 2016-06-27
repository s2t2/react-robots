//var webdriverio = require('webdriverio');
//var options = { desiredCapabilities: { browserName: 'chrome' } };
//var client = webdriverio.remote(options);
//
//client
//  .init()
//  .url('https://duckduckgo.com/')
//  .setValue('#search_form_input_homepage', 'WebdriverIO')
//  .click('#search_button_homepage')
//  .getTitle().then(function(title) {
//      console.log('Title is: ' + title);
//  })
//  .end();


var webdriverio = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'firefox'
    }
};

webdriverio
  .remote(options)
  .init()
  .url('http://www.google.com')
  .getTitle().then(function(title) {
      console.log('Title was: ' + title);
  })
  .end();
