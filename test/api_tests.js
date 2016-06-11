var expect = require('expect');
var request = require('supertest');

var app = require('../app.js');
//var recycleRobots = require('../db/recycle_robots');
//var Robot = require('../models/robot');

//var robots = Robot.defaultRobots();
var robots = [
  {name:"c3po", description:"specializes in language translation"},
  {name:"r2d2", description:"holds a secret message"},
  {name:"c3po", description:"specializes in language translation"},
  {name:"r2d2", description:"holds a secret message"},
  {name:"c3po", description:"specializes in language translation"},
  {name:"r2d2", description:"holds a secret message"},
  {name:"c3po", description:"specializes in language translation"},
  {name:"r2d2", description:"holds a secret message"},
  {name:"c3po", description:"specializes in language translation"},
  {name:"r2d2", description:"holds a secret message"},
  {name:"bb8",  description:"rolls around"}
]

function responseIsArrayOfRobots(res){
  //console.log("BODY", res.text, res.body); // why is the body blank here but not in the assertions below? // jk this is logging now...
  expect(res.body).toBeA("object");
  expect(res.body.length).toEqual(robots.length);
  var matchingRobot = res.body.find(function(r){ return r.name == robots[0].name && r.description == robots[0].description });
  console.log(matchingRobot);
  expect(matchingRobot).toExist();
};

//throw new Error("intentional err")

describe("API", function(){
  describe("INDEX ROUTE", function(){
    //before(function(){
    //  recycleRobots();
    //});

    it("should return an array of json objects", function(done){
      request(app).get("/api/robots")
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(responseIsArrayOfRobots)
        .end(done)
        //.end(function(err, res){
        //  console.log(res.body); // got the right body here
        //  done()
        //})
    });
  });
});
