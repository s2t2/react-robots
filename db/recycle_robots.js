var db = require("../db"); // starts a mongoose connection
var Robot = require("../models/robot");

// TODO: remove dependency on db and return a promise than can be chained to a db disconnect statement

// @param [Object] options
// @param [Object] options [Boolean] disconnect whether or not to execute the database disconnection block
// @example recycleRobots({disconnect:true})
module.exports = function recycleRobots(options){
  Robot.find(function (err, bots) {
    if (err){ return console.error(err); };
    console.log("FOUND", bots.length, "RECORDS");

    Robot.remove(bots, function (rmErr) {
      if (rmErr){ return console.error(rmErr); };
      console.log("DELETED", bots.length, "RECORDS");

      Robot.create(Robot.defaultRobots(), function (crErr, newBots) {
        if (crErr) { return console.error(crErr); };
        console.log("CREATED", newBots.length, "RECORDS");

        if (options.disconnect == true) {
          console.log("CLOSING DATABASE CONNECTION");
          db.disconnect(); // close the connection, else it will keep running, which is appropriate for when the web server runs, but not for scripts.
        };
      }); // Robot.create
    }); // Robot.remove
  }); // Robot.find
};
