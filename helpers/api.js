module.exports = {};

module.exports.createRobotUrl = "api/robots";

module.exports.robotUrl = function(robotId){
  return "/api/robots/"+robotId
};

module.exports.enableAPIMethods = function(expressRouter){
  /* CUSTOM SHARED API RESPONSE METHODS */

  expressRouter.use(function(req, res, next) {
    res.okay = function(responseData) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(responseData);
    };
    next();
  });

  expressRouter.use(function(req, res, next) {
    res.notFound = function(responseData) {
      res.setHeader('Content-Type', 'application/json');
      res.status(404).json(responseData);
    };
    next();
  });
};
