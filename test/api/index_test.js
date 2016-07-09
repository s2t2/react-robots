process.env.NODE_ENV = 'test';

var request = require('supertest'); // source of `.expect()` within a `request` promise chain
var expect = require('expect');

var defaultRobots = require('../data/default_robots').defaultRobots();
var webServer = require('../../webserver.js');
var recycleRobots = require('../../lib/recycle_robots');

function responseIsArrayOfRobots(res){
  expect(res.body).toBeA("object");
  expect(res.body.length).toEqual(defaultRobots.length);
  var knownRobot = defaultRobots[0];
  var matchingRobot = res.body.find(function(r){ return r.name == knownRobot.name && r.description == knownRobot.description });
  //console.log(matchingRobot);
  expect(matchingRobot).toExist();
};

describe("API", function(){
  describe("INDEX ROUTE", function(){
    before(function(done){
      recycleRobots()
        .then(function(results){  console.log("RESULTS", results);  })
        .catch(function(err){  console.log("ERROR", err);  })
        .then(function(){
          console.log("DONE");
          done();
        });
    });

    it("should return an array of json objects", function(done){
      request(webServer).get("/api/robots")
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(responseIsArrayOfRobots)
        .end(done)
    });
  });
});
