var express = require('express');
var router = express.Router();

/* GET ROBOTS API INDEX */
router.get('/api/robots', function(req, res, next) {
  var robots = [
    {id: 1, name:"c3po", description:"specializes in language translation"},
    {id: 2, name:"r2d2", description:"holds a secret message"},
    {id: 3, name:"bb8",  description:"rolls around"}
  ];
  res.setHeader('Content-Type', 'application/json');
  res.json(robots)
});

/* GET ROBOTS API SHOW */
router.get('/api/robots/:id', function(req, res, next) {
  var robot = {id: 101, name: "api bot", description:"lives in the server"};
  res.setHeader('Content-Type', 'application/json');
  res.json(robot);
});

module.exports = router;
