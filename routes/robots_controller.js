var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('robots');
});

/* GET robots index page. */
router.get('/robots', function(req, res, next) {
  res.render('robots/index');
});

/* GET robots show page. */
router.get('/robots/:id', function(req, res, next) {
  res.render('robots/index'); // index and show page share a view
});

module.exports = router;
