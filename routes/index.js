const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
  res.render('pages/home');
});
router.get('/dashboard', function(req, res){
  res.render('pages/dashboard');
});

module.exports = router;
