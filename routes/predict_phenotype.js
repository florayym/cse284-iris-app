var express = require('express');
var router = express.Router();
var models = require('../lib/models');

router.post('/', function (req, res, next) {
  var genotypes = req.body;
  var predicted = models.hirisplex(genotypes);
  res.render('predict_phenotype', { predicted: predicted });
});

module.exports = router;
