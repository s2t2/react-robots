var express = require('express');
var router = express.Router();

var mongooseError = require("../helpers/mongoose_error");
var Robot = require("../models/robot");

/* INDEX */

router.get('/api/robots', function(req, res, next) {
  Robot.find( function (err, bots) {
    console.log("LIST", bots.length, "ROBOTS:", bots);
    res.status(200); // todo: choose proper response code
    res.setHeader('Content-Type', 'application/json');
    res.json(bots);
  });
});

/* SHOW */

router.get('/api/robots/:id', function(req, res, next) {
  var robotId = req.params.id;

  Robot.findById(robotId, function(err, bot) {
    if (err){
      console.log("COULDN'T SHOW ROBOT #"+robotId);
      res.status(400);
      res.setHeader('Content-Type', 'application/json');
      res.json({error: "OOPS"});
    } else {
      console.log("SHOW ROBOT:", bot);
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.json(bot);
    };
  });
});

/* DESTROY */

router.post('/api/robots/:id/destroy', function(req, res, next) {
  console.log("DESTRUCTION PENDING")

  var robot_id = req.params.id;

  Robot.findById(robot_id, function(err, bot) {
    bot.remove( function(rmErr, removed_bot) {
      if (rmErr) {
        console.log("COULDN'T DELETE ROBOT #", bot_id);
        res.status(400);
        res.setHeader('Content-Type', 'application/json');
        res.json({error: "OOPS"});
      } else {
        console.log("DELETED ROBOT", removed_bot);
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.json({message: "OK"});
      };
    });
  });
});

module.exports = router;
