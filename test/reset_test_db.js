var db = require("../db.js");
var recycleRobots = require('../db/recycle_robots');

module.exports = {};

module.exports.resetTestDB = function(mochaDone) {
  recycleRobots()
    .then(function(results){  console.log("RESULTS", results);  })
    .catch(function(err){  console.log("ERROR", err);  })
    .then(function(){
      console.log("DONE");
      db.disconnect().then(mochaDone());
    })
};
