const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
  res.render('pages/index');
});

router.get('/signin', function(req, res){
  res.render('pages/signin');
});

router.get('/register', function(req, res){
  res.render('pages/register');
});

router.get('/home', function(req, res){
  res.render('pages/frontend');
});

router.get('/dashboard', function(req, res){
  res.render('pages/frontend');
});

router.get('/explore', function(req, res){
  res.render('pages/frontend');
});

module.exports = router;
