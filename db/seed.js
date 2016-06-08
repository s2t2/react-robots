var db = require("../db"); // starts a mongoose connection
var Robot = require("../models/robot");

Robot.find(function (err, bots) {
    if (err) return console.error(err);
    console.log("FOUND", bots.length, "ROBOTS TO BE DELETED")

    Robot.remove(bots, function (err) {
        if (err) return console.error(err);
        console.log("DELETED")

        Robot.create(Robot.devRobots, function (err, new_bots) {
            console.log(new_bots)
            db.disconnect(); // close the connection, else it will keep running, which is appropriate for when the web server runs, but not for a script like this.
        });
    });
});
