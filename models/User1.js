const mongoose = require('mongoose');

const User1Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

// module.exports = User = mongoose.model('User', UserSchema);
module.exports = mongoose.model("user", User1Schema);