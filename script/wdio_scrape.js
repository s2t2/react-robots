var webdriverio = require('webdriverio');
var options = {desiredCapabilities: {browserName: 'firefox'}};
var testBrowser = webdriverio.remote(options);

testBrowser
  .init()
  .url('http://www.google.com')
  .getTitle().then(function(title) {
      console.log('Title was: ' + title);
  })
  .end();
