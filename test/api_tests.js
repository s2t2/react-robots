var expect = require('expect');
var request = require('supertest');

var app = require('../app.js');
var Robot = require('../models/robot');

var defaultRobots = Robot.defaultRobots(); // require('../db/default_robots').defaultRobots();

//var recycleRobots = require('../db/recycle_robots');
function recycleRobots(){
  Robot.find(function (err, bots) {
    if (err){ return console.error(err); };
    console.log("FOUND", bots.length, "RECORDS");

    Robot.remove(bots, function (rmErr) {
      if (rmErr){ return console.error(rmErr); };
      console.log("DELETED", bots.length, "RECORDS");

      Robot.create(defaultRobots, function (crErr, newBots) {
        if (crErr) { return console.error(crErr); };
        console.log("CREATED", newBots.length, "RECORDS");
        //db.disconnect();
      }); // Robot.create
    }); // Robot.remove
  }); // Robot.find
};

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
    before(function(){
      recycleRobots();
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
