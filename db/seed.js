var db = require("../db"); // starts a mongoose connection
var Robot = require("../models/robot");

Robot.find(function (err, bots) {
  if (err) return console.error(err);
  console.log("FOUND", bots.length, "RECORDS")

  Robot.remove(bots, function (rmErr) {
    if (rmErr) return console.error(rmErr);
    console.log("DELETED", bots.length, "RECORDS")

    Robot.create(Robot.devRobots, function (crErr, newBots) {
      console.log("CREATED", newBots.length, "RECORDS")
      db.disconnect(); // close the connection, else it will keep running, which is appropriate for when the web server runs, but not for a script like this.
    });
  });
});
