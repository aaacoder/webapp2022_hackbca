var express = require('express');
var router = express.Router();

/* GET events "home" page - a list of all events. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Events', style: ["tables", "event"] });
});

module.exports = router;
