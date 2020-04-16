const mongoose = require('mongoose');

const loginSchema = mongoose.Schema({
    'Username': String,
    'Password': String,
    'EmailId': String,
    'Team': String,
    'Mobile': Number
  });
  
  module.exports = mongoose.model('login', loginSchema);
 