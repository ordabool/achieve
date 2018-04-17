const express = require('express');
const path = require('path');
const mongojs = require('mongojs');
const db = mongojs('mongodb://achieve:123@ds153778.mlab.com:53778/achievedb', ['users']);
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

const router = express.Router();

router.get('/getusers', function(req, res, next){
  db.users.find({}, function(err, users) {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });
});

router.post('/register',[check('username').isEmail().withMessage("This is not a valid mail!").trim()], function(req, res,next){
  const errors = validationResult(req);
  req.flash('notify', 'This is a test notification.');
  res.render(pages/register);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var rememberMeStatus = req.body.remember_me;
  var isRememberMeChecked;
  if (rememberMeStatus == "on"){
    isRememberMeChecked = true;
  } else {
    isRememberMeChecked = false;
  }
  db.users.insert({email: email, password: password, username: username, isRememberMeChecked: isRememberMeChecked}, function(err, user) {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
});

module.exports = router;
