const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  branch: String,
  semster: String, 
});

module.exports = mongoose.model('User', userSchema);
