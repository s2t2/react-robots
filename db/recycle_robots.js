var Robot = require("../models/robot");

module.exports = function recycleRobots(){
  console.log("RECYCLE PENDING");
  return Robot.find()
    .then(function(bots){
      console.log("FOUND", bots.length, "RECORDS");
      return Robot.remove(bots)
        .then(function(){
          console.log("DELETED", bots.length, "RECORDS");
          return Robot.create(Robot.defaultRobots())
        })
    })
};
