var db = require("../db"); // starts a mongoose connection
var recycleRobots = require('./recycle_robots');

recycleRobots()
  .then(function(results){
    console.log("RESULTS", results);
  })
  .catch(function(err){
    console.log("ERROR", err);
  })
  .then(function(){
    console.log("DONE");
    db.disconnect();
  })
