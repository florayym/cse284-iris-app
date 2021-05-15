var express = require('express');
var router = express.Router();

/* GET world page. */
router.get('/', function(req, res, next) {
  res.render('world', { title: 'H+Iris', pid: 1 });
});

module.exports = router;
