var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'VENTA DE INMUEBLES' });
});
router.get('/propi', function(req, res, next) {
  res.render('index', { title: 'VENTA DE INMUEBLES' });
});
module.exports = router;
