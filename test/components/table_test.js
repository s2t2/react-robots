process.env.NODE_ENV = 'test';
var expect = require('expect');
var browser = require('../../helpers/test_browser');
var recycleRobots = require('../../db/recycle_robots');
var defaultRobots = require('../../db/default_robots').defaultRobots();

describe("Table", function(){
  before(function(done){  recycleRobots().then(done());  });

  context("when visited on the 'index' page", function(){
    before(function(){  return browser.visit('/');  });

    it("page should contain a heading", function(){
      expect(browser.query("h2").innerHTML).toEqual("Robots")
    })

    it("page should contain a table", function(){
      browser.assert.element('table');
    })

    it("table should contain a row per record", function(){
      var rows = browser.queryAll("tbody tr")
      expect(rows.length).toEqual(defaultRobots.length)
    })

    describe("Row", function(){
      it("should contain a 'show page' link", function(){
        var robotId = browser.query("tbody tr td").innerHTML;
        var showPageLink = browser.query("tbody tr td a");
        expect(showPageLink.href).toInclude("/robots/"+robotId)
      })
    })
  })
})
