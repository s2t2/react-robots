process.env.NODE_ENV = 'test';
var expect = require('expect');
var browser = require('../../helpers/test_browser');

describe("Form", function(){

  //
  // NEW PAGE
  //

  context("when visited on the 'new' page", function(){
    before(function(){  return browser.visit('/');  });
    before(function(){  return browser.clickLink('new');  });

    it("page should contain a heading", function(){
      expect(browser.query("h2").innerHTML).toEqual("New Robot")
    })

    it("page should contain a form", function(){
      browser.assert.element('form');
    })

    it("form values should be blank", function(){
      browser.assert.input("form input[name=robotName]", "");
      browser.assert.input("form textarea[name=robotDescription]", "");
    })

    //context("when submitted with invalid values", function(){
    //  //console.log(browser.field('robotName'))
    //  //before(function(done) {
    //  //  browser
    //  //    .fill('email',    'zombie@underworld.dead')
    //  //    .fill('password', 'eat-the-living')
    //  //    .pressButton('Sign Me Up!', done);
    //  //});
    //})
  })

  //
  // EDIT PAGE
  //

  context("when visited on the 'edit' page", function(){
    var robotId, robotName, robotDescription;
    before(function(){  return browser.visit('/');  });
    before(function(){
      robotId = browser.query("tbody tr td").innerHTML;
      robotName = browser.query("tbody tr td a").innerHTML;
      robotDescription = browser.queryAll("tbody tr td")[2].innerHTML;
      return browser.pressButton('edit');
    });

    it("page should contain a heading", function(){
      //var robotId = browser.location._url.split("robots/")[1].split("/")[0];
      var pageTitle = browser.query("h2").innerHTML;
      expect(pageTitle).toEqual("Edit Robot #"+robotId);
    });

    it("form values should be robot attributes", function(){
      browser.assert.input("form input[name=robotName]", robotName);
      browser.assert.input("form textarea[name=robotDescription]", robotDescription);
    });
  });
});
