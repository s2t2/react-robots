process.env.NODE_ENV = 'test';

var request = require('supertest'); // source of `.expect()` within a `request` promise chain

var app = require('../../app.js');
var recycleRobots = require('../../db/recycle_robots');
var responseIsArrayOfRobots = require('../../helpers/api_tests.js').responseIsArrayOfRobots;

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
      request(app).get("/api/robots")
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(responseIsArrayOfRobots)
        .end(done)
    });
  });
});
