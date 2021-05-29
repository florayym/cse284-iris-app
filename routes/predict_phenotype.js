var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
  let genotypes = req.body;

  let alpha1 = 1.70;
  let alpha2 = -1.26;
  let alpha3 = -2.62;

  let beta1 = [1.11, 0,46, -1.75, -1.29, 0.39, 0.77, -1.69, 0.10, 0.49, -0.48, 0.69, -0.82, -0.18];
  let beta2 = [0.55, 0.55, 0.10, -1.15, 0.30, 0.85, -13.89, 0.58, -1.14, -0.09, 0.01, -11.78, -0.16];
  let beta3 = [4.09, 0.61, -2.49, -1.13, 1.20, 1.15, 0.10, -0.02, 0.19, -0.54, 0.87, -3.48, 0.40];

  let sum_b1 = 0;
  let sum_b2 = 0;
  let sum_b3 = 0;
  let snps = ['MC1R_R', 'MC1R_r', 'rs12913832', 'rs12203592', 'rs1042602', 'rs4959270', 'rs28777', 'rs683', 'rs1800407', 'rs2402130', 'rs12821256', 'rs16891982', 'rs2378249'];

  for (let i = 0; i < snps.length; i++) {
    sum_b1 += beta1[i] * genotypes[i];
    sum_b2 += beta2[i] * genotypes[i];
    sum_b3 += beta3[i] * genotypes[i];
  }

  let exp_b1 = Math.exp(alpha1 + sum_b1)
  let exp_b2 = Math.exp(alpha2 + sum_b2)
  let exp_b3 = Math.exp(alpha3 + sum_b3)
  let pBlond = exp_b1 / (1 + exp_b1 + exp_b2 + exp_b3)
  let pBrown = exp_b2 / (1 + exp_b1 + exp_b2 + exp_b3)
  let pRed = exp_b3 / (1 + exp_b1 + exp_b2 + exp_b3)
  let pBlack = 1 - pBlond - pBrown - pRed

  res.render('predict_phenotype', { predicted: [pBlond, pBrown, pRed, pBlack] });
});

module.exports = router;
