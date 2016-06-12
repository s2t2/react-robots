var Robot = require("../models/robot");
var defaultRobots = require('../db/default_robots').defaultRobots();

module.exports = function recycleRobots(){
  console.log("RECYCLE PENDING");
  return Robot.find()
    .then(function(bots){
      console.log("FOUND", bots.length, "RECORDS");
      return Robot.remove(bots)
        .then(function(){
          console.log("DELETED", bots.length, "RECORDS");
          return Robot.create(defaultRobots)
        })
    })
};
