const mongoose = require('mongoose');
mongoose.connect('mongodb://achieve:123@ds153778.mlab.com:53778/achievedb');
const db = mongoose.connection;
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    index: true
  },
  password: {
    type: String
  },
  username: {
    type: String
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = (newUser, callback) => {
  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newUser.password, salt, function(err, hash) {
        newUser.password = hash;
        newUser.save(callback);
      });
  });
}

module.exports.getUserByUsername = (username, callback) => {
  let query = {username};
  User.findOne(query, callback);
}

module.exports.getUserById = (id, callback) => {
  User.findById(id, callback);
}

module.exports.comparePassword = (inputPassword, hash, callback) => {
  bcrypt.compare(inputPassword, hash, function(err, isMatch) {
    if (err) throw err;
    callback(null, isMatch);
  });
}
