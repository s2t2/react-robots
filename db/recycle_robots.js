var db = require("../db"); // starts a mongoose connection
var Robot = require("../models/robot");

module.exports = function recycleRobots(){
  //Robot.find(function (err, bots) {
  //  if (err){ return console.error(err); };
  //  console.log("FOUND", bots.length, "RECORDS");
//
  //  Robot.remove(bots, function (rmErr) {
  //    if (rmErr){ return console.error(rmErr); };
  //    console.log("DELETED", bots.length, "RECORDS");
//
  //    Robot.create(Robot.defaultRobots(), function (crErr, newBots) {
  //      if (crErr) { return console.error(crErr); };
  //      console.log("CREATED", newBots.length, "RECORDS");
  //      db.disconnect(); // close the connection, else it will keep running, which is appropriate for when the web server runs, but not for a script like this.
  //    }); // Robot.create
  //  }); // Robot.remove
  //}); // Robot.find
  console.log("RECYCLING HERE!")
};

//module.exports.recycleRobots = function(){
//  Robot.find(function (err, bots) {
//    if (err){
//      return console.error(err);
//    } else {
//      console.log("FOUND", bots.length, "RECORDS")
//      Robot.remove(bots, function (rmErr) {
//        if (rmErr){
//          return console.error(rmErr);
//        } else {
//          console.log("DELETED", bots.length, "RECORDS")
//          Robot.create(Robot.defaultRobots(), function (crErr, newBots) {
//            if (crErr) {
//              return console.error(crErr);
//            } else {
//              console.log("CREATED", newBots.length, "RECORDS")
//            } // if crErr
//            db.disconnect(); // close the connection, else it will keep running, which is appropriate for when the web server runs, but not for a script like this.
//          }); // Robot.create
//        } // if rmErr
//      }); // Robot.remove
//    } // if err
//  }); // Robot.find
//};
