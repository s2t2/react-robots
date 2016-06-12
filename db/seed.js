var db = require("../db"); // starts a mongoose connection

//var recycleRobots = require('./recycle_robots');

var Robot = require("../models/robot");

function recycleRobots(){
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
              //db.disconnect();
            }; // if crErr
          }); // Robot.create
        }; // if rmErr
      }); // Robot.remove
    }; // if err
  }); // Robot.find
};

//recycleRobots()

var doStuff = new Promise(function(resolve, reject) {
  console.log("DOING ASYNC STUFF HERE"); // Do an async task async task and then...
  var myErr = false;
	if(myErr == false) {
		resolve('Success!');
	}
	else {
		reject('Failure!');
	}
});

doStuff
  .then(function(results){
    console.log("RESULTS", results)
    //db.disconnect();
  })
  .catch(function(err){
    console.log("ERROR", err)
  })
  .then(function(){
    console.log("DONE")
    db.disconnect();
  })

//console.log("DISCONNECT PENDING")
//db.disconnect();
