process.env.NODE_ENV = 'test';

var Browser = require('zombie');

Browser.localhost('example.com', 3000);

describe("Form", function(){
  context("when visited", function(){
    const browser = new Browser();

    before(function(done) {
      browser.visit('/', done);
    });

    //before(function(done) {
    //  browser
    //    .fill('email',    'zombie@underworld.dead')
    //    .fill('password', 'eat-the-living')
    //    .pressButton('Sign Me Up!', done);
    //});

    it("should contain empty input values", function(){
      console.log(browser.document.documentElement.innerHTML)
      browser.assert.success();
      browser.assert.text('title', 'Robots App!');
      browser.assert.element('table');
    })
  })
})
