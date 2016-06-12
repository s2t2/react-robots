var Robot = require("../models/robot");

module.exports = function recycleRobots(){
  console.log("RECYCLE PENDING");
  Robot.find(function (err, bots) {
    console.log("FIND PENDING");
    if (err){
      console.log("FIND ERROR", err);
      return err;
    } else {
      console.log("FOUND", bots.length, "RECORDS");
      Robot.remove(bots, function (rmErr) {
        if (rmErr){
          console.log("REMOVAL ERROR", rnErr);
          return rmErr;
        } else {
          console.log("DELETED", bots.length, "RECORDS");
          Robot.create(Robot.defaultRobots(), function (crErr, newBots) {
            if (crErr) {
              console.log("CREATION ERROR", crErr);
              return crErr;
            } else {
              console.log("CREATED", newBots.length, "RECORDS");
              return newBots;
            }; // if crErr
          }); // Robot.create
        }; // if rmErr
      }); // Robot.remove
    }; // if err
  }); // Robot.find
};
