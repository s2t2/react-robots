var express = require('express');
var router = express.Router();

var recycleRobots = require('../lib/recycle_robots');
var mongooseError = require("../lib/mongoose_error");
var Robot = require("../models/robot.js");

//
// API RESPONSE METHODS
//

function enableAPIMethods(expressRouter){
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

enableAPIMethods(router); // enables `res.okay()`, `res.notFound()` et. al.

//
// DATABASE ERROR PARSING METHODS
//

// Transform mongoose error object into error message(s).
//
// @param [MongooseErrorObject] err
// A mongoose error like...
//
//  {
//    message: 'Note validation failed',
//    name: 'ValidationError',
//    errors:{
//      description:{
//        message: 'Path `description` is required.',
//        name: 'ValidatorError',
//        properties: [Object],
//        kind: 'required',
//        path: 'description',
//        value: ''
//      },
//      title:{
//        message: 'Path `name` is required.',
//        name: 'ValidatorError',
//        properties: [Object],
//        kind: 'required',
//        path: 'title',
//        value: ''
//      }
//    }
//  }
//
// ... or like ...
//
//  {
//    message: 'Cast to ObjectId failed for value "abc" at path "_id"',
//    name: 'CastError',
//    kind: 'ObjectId',
//    value: 'abc',
//    path: '_id',
//    reason: undefined
//  }
//
// @return [Array]
function toMessages(err){
  var messages;
  switch (err.name) {
    case "ValidationError":
      var errors = err.errors;
      messages = Object.keys(errors).map(function(k) {
        return errors[k].name+': '+errors[k].path+' is '+errors[k].kind //> ValidatorError: description is required
      }); //> ["ValidatorError: description is required", "ValidatorError: title is required"]
      break;
    case "CastError":
      messages = ["Sorry, couldn't find a record with that identifier..."];
      break;
    default:
      messages = ["Oops, encountered an unexpected database error..."];
  };
  console.log(messages);
  return messages;
};

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
      res.notFound({messages: toMessages(saveErr), bot: {name: formBot.name, description: formBot.description}}); // pass-back input values
    } else {
      res.okay(newBot);
    };
  });
});

/* RECYCLE */

router.post('/api/robots/recycle', function(req, res, next) {
  recycleRobots()
    .then(function(results){
      res.okay({messages: ["OK"], deletedRobotsCount: results.deletedRobotsCount, createdRobotsCount: results.createdRobotsCount});
    })
    .catch(function(err){
      res.notFound({messages: ["RECYCLING ERROR"]});
    })
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
  console.log("FORM BOT", formBot)
  Robot.findById(formBot._id, function(err, bot) {
    if (err){
      res.notFound({messages: toMessages(err), bot: formBot }); // pass-back form values
    } else {
      bot.name = formBot.name;
      bot.description = formBot.description;
      bot.save(function(saveErr, newBot) {
        if (saveErr){
          res.notFound({messages: toMessages(saveErr), bot: formBot }); // pass-back form values
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
