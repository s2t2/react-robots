var expect = require('expect');

var defaultRobots = require('../db/default_robots').defaultRobots();

module.exports = {};

// @params [] res
module.exports.responseIsArrayOfRobots = function(res){
  expect(res.body).toBeA("object");
  expect(res.body.length).toEqual(defaultRobots.length);
  var knownRobot = defaultRobots[0];
  var matchingRobot = res.body.find(function(r){ return r.name == knownRobot.name && r.description == knownRobot.description });
  //console.log(matchingRobot);
  expect(matchingRobot).toExist();
};
