const express = require('express');
// const mongojs = require('mongojs');
// const db = mongojs('mongodb://achieve:123@ds153778.mlab.com:53778/achievedb', ['users']);
const mongoose = require('mongoose');
mongoose.connect('mongodb://achieve:123@ds153778.mlab.com:53778/achievedb');
const db = mongoose.connection;
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
const router = express.Router();

function removeDuplicatesFromArray(arrArg) {
  return arrArg.filter((elem, pos, arr) => {
    return arr.indexOf(elem) == pos;
  });
}

router.get('/getusers', (req, res) => {
  db.users.find({}, (err, users) => {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });
});

router.get('/deleteall', (req, res) => {
  db.users.remove({}, (err, users) => {
    if (err) {
      res.send(err);
    }
    res.send("Removed all users");
  });
});

const registerValidations = [
  // check('username', 'Not a valid username').isAlphanumeric().trim()
  // .custom(value => {
  //   return new Promise((resolve, reject) => {
  //     db.users.findOne({username: value}, (err, user) => {
  //       if(user !== null) {
  //         return reject();
  //       } else {
  //         return resolve();
  //       }
  //     });
  //   });
  // }).withMessage('Username is already taken'),

  // check('email', 'This is not a valid mail').isEmail().trim()
  // .custom(value => {
  //   return new Promise((resolve, reject) => {
  //     db.users.findOne({email: value}, (err, user) => {
  //       if(user !== null) {
  //         return reject();
  //       } else {
  //         return resolve();
  //       }
  //     });
  //   });
  // }).withMessage('Email is already taken'),

  // check('password', 'passwords must be at least 8 chars long and contain one number').isLength({ min: 8 }).matches(/\d/).trim(),
];

router.post('/register', registerValidations, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorMessages = [];
    errors.array().forEach((error) => {
      errorMessages.push(error.msg);
    });
    errorMessages = removeDuplicatesFromArray(errorMessages);
    res.render('pages/register', {errors: errorMessages});
  } else {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let rememberMeStatus = req.body.remember_me;
    let isRememberMeChecked;
    if (rememberMeStatus == "on"){
      isRememberMeChecked = true;
    } else {
      isRememberMeChecked = false;
    }

    let newUser = new User({email, password, username});
    User.createUser(newUser, (err, user) => {
      if (err) {
        res.send(err);
      }
      res.redirect('../home');
    });
  }
});

router.get('/signin', (req, res) => {
  res.redirect('../signin');
});
router.get('/register', (req, res) => {
  res.redirect('../register');
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, (err, user) => {
      if (err) throw err;
      if (!user) {
        return done(null, false, {message: 'Unknown User'});
      }

      User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {message: 'Invalid Password'});
        }
      });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/signin',
  passport.authenticate('local', {successRedirect:'/home', failureRedirect:'/users/signin', failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/signin');
});

module.exports = router;
