process.env.NODE_ENV = 'test';
var expect = require('expect');
var driver = require("../../helpers/test_web_driver.js").driver,
    By = require("../../helpers/test_web_driver.js").By;

describe("Form Submit", function(){

  this.timeout(15000)

  //
  // NEW PAGE
  //

  context("when visited on the 'new' page", function(){
    //before(function(){
    //  return driver.get('http://localhost:3000/');
    //});
    //before(function(){
    //  return driver.findElement(By.partialLinkText('new')).click();
    //});
    //after(function(){
    //  driver.quit();
    //})

    context("when submitted with invalid values", function(){
      it("flash should include error messages", function(){

        return driver.get('http://localhost:3000/').then(function(){
          driver.findElement(By.partialLinkText('new')).click().then(function(){
            driver.findElement(By.xpath('//button[@type="submit"]')).click().then(function(){
              driver.findElements(By.css("div .alert")).then(function(elements){
                console.log("MESSAGES", elements.length)

                expect(elements.length).toEqual(5)

                driver.quit();

              }) // FIND MESSAGES
            }) // CLICK SUBMIT
          }) // CLICK NEW
        }) // GET INDEX

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
