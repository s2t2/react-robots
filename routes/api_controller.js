var express = require('express');
var router = express.Router();

var mongooseError = require("../helpers/mongoose_error");
var Robot = require("../models/robot");

/* INDEX */

router.get('/api/robots', function(req, res, next) {
  Robot.find( function (err, bots) {
    console.log("LIST", bots.length, "ROBOTS:", bots);
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
      var error_messages = mongooseError.toMessages(err);
      console.log(error_messages); //req.flash('danger', error_messages);
      res.status(404);
      res.send(error_messages);
    } else {
      console.log("SHOW ROBOT:", bot);
      res.setHeader('Content-Type', 'application/json');
      res.json(bot);
    };
  });
});

module.exports = router;
