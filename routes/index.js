var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'React Robots!', // todo: move to a component
    page_title: 'Robots' // todo: move to a component
  });
});

module.exports = router;
