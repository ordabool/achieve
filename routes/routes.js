const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
  res.render('pages/home');
});
router.get('/home', function(req, res){
  res.render('pages/home');
});
router.get('/dashboard', function(req, res){
  res.render('pages/home');
});
router.get('/explore', function(req, res){
  res.render('pages/home');
});

module.exports = router;
