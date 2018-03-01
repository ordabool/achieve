const express = require('express');
const path = require('path');
const mongojs = require('mongojs');
const db = mongojs('mongodb://achieve:123@ds153778.mlab.com:53778/achievedb', ['users']);

const router = express.Router();

router.get('/getusers', function(req, res, next){
  db.users.find({}, function(err, users) {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });
});

module.exports = router;
