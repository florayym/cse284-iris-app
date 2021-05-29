var express = require('express');
var router = express.Router();

/* GET online analysis page. */
router.get('/', function(req, res, next) {
  res.render('analysis', { title: 'H+Iris', pid: 2 });
});

module.exports = router;
