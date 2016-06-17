process.env.NODE_ENV = 'test';
var expect = require('expect');
var browser = require('../../helpers/test_browser');

describe("Form Submit", function(){

  //
  // NEW PAGE
  //

  context("when visited on the 'new' page", function(){
    before(function(){  return browser.visit('/');  });
    before(function(){  return browser.clickLink('new');  });

    context("when submitted with invalid values", function(){
      before(function() {
        return browser.pressButton('Submit');
      });

      it("flash should include error messages", function(){
        var messages = browser.queryAll(".alert")
        console.log(messages)
        expect(messages.length).toEqual(2)
      })
    })

    //context("when submitted with an invalid value", function(){
    //  before(function() {
    //    return browser.fill("robotName", "Baker Bot").pressButton('Submit');
    //  });
//
    //  it("flash should include an error message", function(){
    //    expect(browser.queryAll(".alert-warning").length).toEqual(1)
    //  })
//
    //  it("form values should be passed back", function(){
    //    browser.assert.input("form input[name=robotName]", "Baker Bot");
    //    browser.assert.input("form textarea[name=robotDescription]", "");
    //  })
    //})

    //context("when submitted with valid values", function(){
    //  before(function(done) {
    //    //browser
    //    //  .fill('email',    'zombie@underworld.dead')
    //    //  .fill('password', 'eat-the-living')
    //    //  .pressButton('Sign Me Up!', done);
    //    console.log(browser.field('robotName'))
    //    done()
    //  });
    //  it("flash should include error message(s)", function(){
    //  })
    //
    //  it("form values should be passed back", function(){
    //  })
    //})
  })

  //
  // EDIT PAGE
  //

  //context("when visited on the 'edit' page", function(){
  //
  //});
});
