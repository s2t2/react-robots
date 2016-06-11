var expect = require('expect');
var request = require('supertest');

var app = require('../app.js');
var recycleRobots = require('../db/recycle_robots');
var Robot = require('../models/robot');

var defaultRobots = Robot.defaultRobots();

function responseIsArrayOfRobots(res){
  //console.log("BODY", res.text, res.body);
  expect(res.body).toBeA("object");
  expect(res.body.length).toEqual(defaultRobots.length);
  var matchingRobot = res.body.find(function(r){ return r.name == defaultRobots[0].name && r.description == defaultRobots[0].description });
  console.log(matchingRobot);
  expect(matchingRobot).toExist();
};

describe("API", function(){
  describe("INDEX ROUTE", function(){
    before(function(){
      recycleRobots(); // need to wait until this is finished before running tests or else the tests will test sometime when the records are not there and throw an error due to an empty response
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
