var express = require('express');
var router = express.Router();

var defaultRobots = require('../db/default_robots').defaultRobots();
var mongooseError = require("../helpers/mongoose_error");
var Robot = require("../models/robot");

/* CUSTOM RESPONSE METHODS */

router.use(function(req, res, next) {
  res.okay = function(responseData) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(responseData);
  };
  next();
});

router.use(function(req, res, next) {
  res.notFound = function(responseData) {
    res.setHeader('Content-Type', 'application/json');
    res.status(404).json(responseData);
  };
  next();
});

/* INDEX */

router.get('/api/robots', function(req, res, next) {
  Robot.find().sort({created_at: 'desc'}).exec(function (err, bots) {
    res.okay(bots);
  });
});

/* CREATE */

router.post('/api/robots', function(req, res, next) {
  var formBot = {name: req.body.robotName, description: req.body.robotDescription};
  var newBot = new Robot({name: formBot.name, description: formBot.description});
  newBot.save(function(saveErr, botId) {
    if (saveErr){
      res.notFound({messages: mongooseError.toMessages(saveErr), bot: {name: formBot.name, description: formBot.description}}); // pass-back input values
    } else {
      res.okay(newBot);
    };
  });
});

/* RECYCLE */

router.post('/api/robots/recycle', function(req, res, next) {
  Robot.find(function (err, bots) {
    if (err) {
      res.notFound({messages: ["FIND ERROR"]});
    } else {
      Robot.remove(bots, function (rmErr) {
        if (rmErr){
          res.notFound({messages: ["REMOVAL ERROR"]});
        } else {
          Robot.create(defaultRobots, function (err, newBots) {
            res.okay({messages: ["OK"], deletedRobotsCount: bots.length, createdRobotsCount: newBots.length});
          }); // Robot.create
        }; // if rmErr
      }); // Robot.remove
    }; // if err
  }); // Robot.find
});

/* SHOW */

router.get('/api/robots/:id', function(req, res, next) {
  var robotId = req.params.id;
  Robot.findById(robotId, function(err, bot) {
    if (err){
      res.notFound({messages: ["FIND ERROR"]});
    } else {
      res.okay(bot);
    };
  });
});

/* UPDATE */

router.post('/api/robots/:id/update', function(req, res, next) {
  var formBot = { _id: req.params.id, name: req.body.robotName, description: req.body.robotDescription};
  Robot.findById(formBot._id, function(err, bot) {
    if (err){
      res.notFound({messages: mongooseError.toMessages(err), bot: formBot }); // pass-back form values
    } else {
      bot.name = formBot.name;
      bot.description = formBot.description;
      bot.save(function(saveErr, newBot) {
        if (saveErr){
          res.notFound({messages: mongooseError.toMessages(saveErr), bot: formBot }); // pass-back form values
        } else {
          res.okay(bot);
        };
      });
    };
  });
});

/* DESTROY */

router.post('/api/robots/:id/destroy', function(req, res, next) {
  var robotId = req.params.id;
  Robot.findById(robotId, function(err, bot) {
    if(err){
      res.notFound({messages: ["FIND ERROR"]})
    } else {
      bot.remove( function(rmErr, rmBot) {
        if (rmErr) {
          res.notFound({messages: ["DESTRUCTION ERROR"]})
        } else {
          res.okay({messages: ["DESTRUCTION OK"] });
        };
      });
    }

  });
});

module.exports = router;
