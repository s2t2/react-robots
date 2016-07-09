process.env.NODE_ENV = 'test';

var expect = require('expect'); // source of `expect()`
var request = require('supertest'); // source of `.expect()` within a `request` promise chain

var webServer = require('../../webserver.js');
var defaultRobots = require('../../db/default_robots').defaultRobots();
var recycleRobots = require('../../db/recycle_robots');

describe("API", function(){
  describe("RECYCLE ROUTE", function(){
    before(function(done){  recycleRobots().then(done());  });

    it("should specify how many records were created and destroyed", function(done){
      request(webServer).post("/api/robots/recycle")
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res){
          //console.log(res.body);
          expect(res.body).toInclude({
            createdRobotsCount: defaultRobots.length,
            deletedRobotsCount: defaultRobots.length
          })
        })
        .end(done)
    });
  });
});
