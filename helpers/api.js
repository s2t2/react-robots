module.exports = {};

module.exports.createRobotUrl = "api/robots";

module.exports.robotUrl = function(robotId){
  return "/api/robots/"+robotId
};
