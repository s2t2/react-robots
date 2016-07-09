var Robot = require("../models/robot.js");
var defaultRobots = require('../lib/default_robots.js').defaultRobots();

module.exports = function recycleRobots(){
  //console.log("RECYCLE PENDING");
  return Robot.find().then(function(bots){
      //console.log("FOUND", bots.length, "RECORDS");
      return Robot.remove(bots).then(function(){
          //console.log("DELETED", bots.length, "RECORDS");
          return Robot.create(defaultRobots).then(function(){
              //console.log("CREATED", defaultRobots.length, "RECORDS")
              return Promise.resolve({
                deletedRobotsCount: bots.length,
                createdRobotsCount: defaultRobots.length
              })
            })
          })
      })
  };
