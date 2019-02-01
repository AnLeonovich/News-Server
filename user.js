const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

const User = mongoose.model('user', UserSchema)

module.exports = User