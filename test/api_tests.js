var expect = require('expect');
var request = require('supertest');

var app = require('../app.js');
var defaultRobots = require('../db/default_robots').defaultRobots();
var recycleRobots = require('../db/recycle_robots');
var Robot = require('../models/robot');

function responseIsArrayOfRobots(res){
  expect(res.body).toBeA("object");
  expect(res.body.length).toEqual(defaultRobots.length);
  var knownRobot = defaultRobots[0];
  var matchingRobot = res.body.find(function(r){ return r.name == knownRobot.name && r.description == knownRobot.description });
  console.log(matchingRobot);
  expect(matchingRobot).toExist();
};

describe("API", function(){
  describe("INDEX ROUTE", function(){
    before(function(done){
      recycleRobots().then(done());
    });

    it("should return an array of json objects", function(done){
      request(app).get("/api/robots")
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(responseIsArrayOfRobots)
        .end(done)
    });
  });
});
