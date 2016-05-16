var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'React Robots!',
    page_title: 'Robots',
    robots:[
      {name:"c3po", description:"specializes in language translation"},
      {name:"r2d2", description:"holds a secret message"},
      {name:"bb8",  description:"rolls around"}
    ]
  });
});

module.exports = router;
