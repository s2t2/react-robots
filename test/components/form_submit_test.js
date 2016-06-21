process.env.NODE_ENV = 'test';
var expect = require('expect');
var driver = require("../../helpers/test_web_driver.js").driver,
    By = require("../../helpers/test_web_driver.js").By;

// HELPER FUNCTIONS

function getIndex(){
  return driver.get('http://localhost:3000/');
}

function clickNew(){
  return driver.findElement(By.partialLinkText('new')).click();
}

function clickSubmit(){
  return driver.findElement(By.xpath('//button[@type="submit"]')).click();
}

function findMessages(){
  return driver.findElements(By.css("div .alert"));
}

function logMessages(elements){
  elements.forEach(function(element){
    element.getText().then(function(text){
      console.log("MESSAGE", text)
    })
  })
}




describe("Form Submit", function(){
  this.timeout(15000)

  //
  // NEW PAGE
  //

  context("when visited on the 'new' page", function(){
    before(function(){  return getIndex().then(clickNew);  });
    after(function(){  driver.quit(); })

    context("when submitted with invalid values", function(){
      before(function(){  return clickSubmit();  })

      it("flash should include error messages", function(){
        return findMessages().then(function(elements){
          console.log("MESSAGES", elements.length)
          expect(elements.length).toEqual(5)
        })
      })
    })







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
